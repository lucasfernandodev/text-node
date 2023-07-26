import { JSONContent } from '@tiptap/react';
import Dexie, { Table } from 'dexie';

export interface documentScheme {
  id: string,
  title: string,
  site: string,
  updateAt?: string,
  createAt: string,
  content: JSONContent,
}

interface updateProps {
  id: string,
  data: Omit<documentScheme, 'createAt'>
}

export class Initialise extends Dexie {
  public editor!: Table<documentScheme, string>

  public constructor() {
    const database_name = 'editordb'
    super(database_name)
    this.version(1).stores({
      editor: 'id, &title, site, updateAt, createAt, content'
    })
  }

  async addNote({ data }: { data: Omit<documentScheme, 'updateAt' | 'createAt'> }): Promise<string> {
    return await this.editor.add({
      ...data,
      id: data.id,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    })
  }

  async getAllNotes(): Promise<[] | documentScheme[]> {
    return await this.editor.toArray()
  }

  async getNote({ id }: { id: string }): Promise<documentScheme | undefined> {
    return await this.editor.get({
      id
    })
  }

  async updateNote({ id, data }: updateProps) {
    return this.editor.update(id, {
      ...data,
      updateAt: new Date()
    })
  }

  public hookCreate(fn: () => void) {

    this.editor.hook('creating', function () {
      this.onsuccess = fn
      this.onerror = console.log
    })
  }
}

export const db = new Initialise()
