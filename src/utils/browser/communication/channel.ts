type origem = 'content' | 'service_worker' | 'channel'

interface ChannelProperties<T> {
  send: (data: object) => void
  data: T & { origem: origem, subject: string, message?: string }
}

export type callbackPropsType<T> = (props: ChannelProperties<T>) => void

export class Channel {

  private connectionMessage = { data: { origem: 'channel', subject: "start", message: 'started' } }
  private port = 'channelTsNode' as string

  constructor(port?: string) {
    port && this.port === port
  }

  public fromContent<T>(fn: callbackPropsType<T>): void {

    const port = chrome.runtime.connect({ name: this.port });

    port.postMessage({ data: { origem: 'channel', subject: "start", message: 'start' } })

    const listener = (props: ChannelProperties<T>) => {
      if (props.data.origem === 'channel') { /* */ }
      fn({ ...props, send: (data: object) => port.postMessage(data) })

      return true
    }

    port.onMessage.addListener(listener)
  }

  public fromWorker<T>(fn: callbackPropsType<T>): void {
    chrome.runtime.onConnect.addListener((port) => {

      const listener = (props: ChannelProperties<T>) => {
        if (props.data.origem === 'channel') { port.postMessage(this.connectionMessage) }
        fn({ ...props, send: (data: object) => port.postMessage(data) })

        return true
      }

      if (port.name === this.port) port.onMessage.addListener(listener)
    })
  }
}
