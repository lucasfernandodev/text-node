import { JSONContent } from '@tiptap/react';
import Dexie, { Table } from 'dexie';
import { INote } from '../types/note';

interface AddNoteProps {
  data: Omit<INote, 'updateAt' | 'createAt'>
}

interface UpdateNoteProps {
  id: string,
  data: Omit<INote, 'createAt'>
}

export class Initialise extends Dexie {
  public editor!: Table<INote, string>

  public constructor() {
    const database_name = 'editordb'
    super(database_name)
    this.version(1).stores({
      editor: 'id, &title, site, updateAt, createAt, content'
    })
  }

  async addNote({ data }: AddNoteProps): Promise<string> {
    return await this.editor.add({
      ...data,
      id: data.id,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    })
  }

  async getAllNotes(): Promise<INote[]> {
    return await this.editor.toArray()
  }

  async getNote({ id }: { id: string }): Promise<INote | undefined> {
    return await this.editor.get({
      id
    })
  }

  async updateNote({ id, data }: UpdateNoteProps) {
    return this.editor.update(id, {
      ...data,
      updateAt: new Date()
    })
  }

  public hookCreate(callback: () => void) {
    this.editor.hook('creating', function () {
      this.onsuccess = callback
      this.onerror = console.log
    })
  }
}

export const db = new Initialise()
