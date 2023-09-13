export interface listenProps<T> {
  source: 'channel' | 'content' | 'service_worker',
  subject: string,
  data: T
}


export interface responseOfContent<T> extends listenProps<T> {
  readonly source: 'content'
}

export interface responseOfBackground<T> extends listenProps<T> {
  readonly source: 'service_worker'
}

type listenerResposne = Promise<void> | void

export type listenerProps<request, response> = (request: request,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: response) => void
) => listenerResposne

type req<T> = listenProps<T>
type sender = chrome.runtime.MessageSender

type sendResponse<R, T> = (response?: R extends responseOfBackground<T> ? responseOfBackground<T> : responseOfContent<T>) => void

type sendResBackground<T> = sendResponse<responseOfBackground<T>, T>
type sendResContent<T> = sendResponse<responseOfContent<T>, T>


export const listener = {
  background: <T>(listener: listenerProps<listenProps<T>, responseOfBackground<T>>, drop = false) => {
    // Default listener
    const _listener = (request: req<T>, sender: sender, sendResponse: sendResBackground<T>) => {
      listener(request, sender, sendResponse)?.catch(console.error)
    }

    if (!drop) {
      chrome.runtime.onMessage.addListener(_listener)
    } else {
      chrome.runtime.onMessage.removeListener(_listener)
    }
  },

  content: <T>(listener: listenerProps<listenProps<T>, responseOfContent<T>>, drop = false) => {
    // Default listener
    const _listener = (request: req<T>, sender: sender, sendResponse: sendResContent<T>) => {
      listener(request, sender, sendResponse)?.catch(console.error)
    }

    if (!drop) {
      chrome.runtime.onMessage.addListener(_listener)
    } else {
      chrome.runtime.onMessage.removeListener(_listener)
    }

  }
}
