import { communication } from "@utils/browser/communication";
import { INote } from "../types/note";
import {
  AddNoteProps,
  DeleteNoteProps,
  GetNoteProps,
  TAllArgs,
  TNotesDatabaseQuerys,
  UpdateNoteProps,
  db
} from "./dexie";

interface props {
  command: TNotesDatabaseQuerys
  content: unknown
}

interface IReceiveQueryConfig {
  request: {
    origem: string,
    subject: string
  },
  sendTo: {
    origem: string,
    subject: string
  }
}

const querys: TNotesDatabaseQuerys[] = ['addNote', 'getAllNotes', 'getNote', 'updateNote', 'deleteNote']

class Notes{
  private receiveQueryConfig: IReceiveQueryConfig = {
    request: {
      origem: 'content',
      subject: 'db'
    },
    sendTo: {
      origem: 'service_worker',
      subject: 'db'
    }
  }

  executeQueryesByMessage({ request, sendTo } = this.receiveQueryConfig) {
    communication.background.channel<props>(({ data, send }) => {
      const isRequestValid = data.origem === request.origem && data.subject === request.subject
      if (isRequestValid) {
        const executeQueryes = async () => {
          for (const query of querys) {
            if (data.command === query) {
              const response = await db[query](data.content as TAllArgs)
              const message = { response, origem: sendTo.origem, subject: sendTo.subject }
              send({ data: message });
            }
          }
        }

        executeQueryes().catch(console.error)
      }
    })
  }

  async execute<T>(content: object, command: TNotesDatabaseQuerys): Promise<T> {
    return new Promise((resolve) => {
      communication.content.channel<{ response: INote }>(({ data, send }) => {
        if (data.origem === 'service_worker' && data.subject === 'db') {
          resolve(data.response as T)
        } else {
          send({ data: { origem: 'content', subject: 'db', content, command } })
        }
      })
    })
  }

  async add(data: AddNoteProps) {
    const response = await this.execute<string>(data, 'addNote')
    return response
  }

  async getAll() {
    const response = await this.execute<INote[]>({}, 'getAllNotes')
    return response
  }

  async get({ id }: GetNoteProps) {
    const response = await this.execute<INote | undefined>({ id }, 'getNote')
    return response
  }

  async update({ id, data }: UpdateNoteProps) {
    await this.execute<void>({ id, data }, 'updateNote')
  }

  async delete({ id }: DeleteNoteProps) {
    await this.execute<void>({ id }, 'deleteNote')
  }
}

export const query = {
  notes: new Notes()
}
