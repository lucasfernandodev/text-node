import { Channel } from "./channel"
import { listener } from "./listener"

export interface CommunicationProps<T> {
  source: 'channel' | 'content' | 'service_worker',
  subject: string,
  data: T
}

interface backgroundProps<T> extends CommunicationProps<T> {
  readonly source: 'service_worker'
}

interface contentProps<T> extends CommunicationProps<T> {
  readonly source: 'content'
}

class Communication extends Channel {

  constructor(port?: string) {
    super(port)
  }

  public background = {
    listen: listener.background,
    channel: this.fromWorker.bind(this),
    send: <T>(tabId: number, content: backgroundProps<T>) => { chrome.tabs.sendMessage(tabId, content,).catch(console.error) }
  }

  public content = {
    listen: listener.content,
    channel: this.fromContent.bind(this),
    send: <T>(content: contentProps<T>) => { chrome.runtime.sendMessage(content, () => { /**/ }) }
  }
}

export const communication = new Communication()
