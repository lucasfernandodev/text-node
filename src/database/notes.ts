import { communication } from "../utils/browser/communication";
import { INote } from "../types/note";

interface updateProps {
  id: string,
  data: Omit<INote, 'createAt'>
}

export type TCommand = 'addNote' | 'getAllNotes' | 'getNote' | 'updateNote' | 'delete'

class Notes {

  async execute(content: object, command: TCommand) {

    return new Promise((resolve) => {
      communication.content.channel<{ response: INote }>(({ data, send }) => {
        if (data.origem === 'service_worker' && data.subject === 'db') {
          resolve(data.response)
        } else {
          send({ data: { origem: 'content', subject: 'db', content, command } })
        }
      })
    })
  }

  async add(data: Omit<INote, 'updateAt' | 'createAt'>): Promise<string> {
    const response = await this.execute({ data }, 'addNote')
    return response as string
  }

  async getAll(): Promise<[] | INote[]> {
    const response = await this.execute({}, 'getAllNotes')
    return response as []
  }

  async get({ id }: { id: string }): Promise<INote | undefined> {
    const response = await this.execute({ id }, 'getNote')
    return response as undefined
  }

  async update({ id, data }: updateProps): Promise<INote> {
    const response = await this.execute({ id, data }, 'updateNote')
    return response as INote
  }

  async delete({ id }: { id: string }) {
    const response = await this.execute({ id }, 'delete')
    return response as undefined
  }
}

export const notes = new Notes()
