/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { documentScheme } from ".";
import { communication } from "../core/chrome/communication";

interface updateProps {
  id: string,
  data: Omit<documentScheme, 'createAt'>
}

export type TCommand = 'addNote' | 'getAllNotes' | 'getNote' | 'updateNote'

class Notes {

  async execute(content: object, command: TCommand) {

    return new Promise((resolve) => {
      communication.content.channel<{ response: documentScheme }>(({ data, send }) => {
        if (data.origem === 'service_worker' && data.subject === 'db') {
          resolve(data.response)
        } else {
          send({ data: { origem: 'content', subject: 'db', content, command } })
        }
      })
    })
  }

  async add(data: Omit<documentScheme, 'updateAt' | 'createAt'>): Promise<string> {
    const response = await this.execute({ data }, 'addNote')
    return response as string
  }

  async getAll(): Promise<[] | documentScheme[]> {
    const response = await this.execute({}, 'getAllNotes')
    return response as []
  }

  async get({ id }: { id: string }): Promise<documentScheme | undefined> {
    const response = await this.execute({ id }, 'getNote')
    return response as undefined
  }

  async update({ id, data }: updateProps): Promise<documentScheme> {
    const response = await this.execute({ id, data }, 'updateNote')
    return response as documentScheme
  }
}

export const notes = new Notes()
