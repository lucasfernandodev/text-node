import { communication } from "./communication";
import { AddNoteProps, GetNoteProps, UpdateNoteProps, db } from "../../database";
import { TCommand } from "../../database/notes";

interface data {
  command: TCommand
  content: unknown
}

communication.background.channel<data>(({ data, send }) => {

  if (data.origem === 'content' && data.subject === 'db') {
    (async () => {

      if (data.command === 'addNote') {
        const response = await db.addNote(data.content as AddNoteProps)
        send({ data: { response, origem: 'service_worker', subject: 'db' } });
      }

      if (data.command === 'getAllNotes') {
        const response = await db.getAllNotes()
        send({ data: { response, origem: 'service_worker', subject: 'db' } });
      }

      if (data.command === 'getNote') {
        const response = await db.getNote(data.content as GetNoteProps)
        send({ data: { response, origem: 'service_worker', subject: 'db' } });
      }

      if (data.command === 'updateNote') {
        const response = await db.updateNote(data.content as UpdateNoteProps)
        send({ data: { response, origem: 'service_worker', subject: 'db' } });
      }

    })();
  }
})

async function createContextMenu() {

  chrome.contextMenus.removeAll();

  const data = await db.getAllNotes()

  if (data.length !== 0) {
    const parent = chrome.contextMenus.create({
      "title": 'Open',
      "id": "textnote"
    });

    for (const note of data) {

      chrome.contextMenus.create({
        title: `${note.title}`,
        parentId: parent,
        id: note.id
      });
    }
  }

  chrome.contextMenus.create({
    "title": 'Create Note',
    "contexts": ["page"],
    "id": "newNote"
  });
}




chrome.runtime.onInstalled.addListener(function () {
  createContextMenu().catch(console.error)
});

interface response {
  editor: { id?: string, command: string }
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.parentMenuItemId) {
    communication.background.send<response>(tab?.id as number, {
      source: "service_worker",
      data: {
        editor: { id: info.menuItemId as string, command: 'open' },
      },
      subject: "contextmenu:editor",
    })
  }

  if (!info.parentMenuItemId && info.menuItemId === 'newNote') {
    communication.background.send<response>(tab?.id as number, {
      source: "service_worker",
      data: {
        editor: { command: 'new' },
      },
      subject: "contextmenu:editor",
    })
  }
})

// Update contextMenu with new note is saved
db.hook.create(() => {
  createContextMenu().catch(console.error)
})

db.hook.updating(() => {
  createContextMenu().catch(console.error)
})

db.hook.delete(() => {
  createContextMenu().catch(console.error)
})
