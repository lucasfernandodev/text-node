import { communication } from "../../../utils/browser/communication";
import { AddNoteProps, GetNoteProps, UpdateNoteProps, db } from "../../../database";
import { TCommand } from "../../../database/notes";
import { ContextMenu } from "./contextmenu";

interface data {
  command: TCommand
  content: unknown
}

communication.background.channel<data>(({ data, send }) => {

  if (data.origem === 'content' && data.subject === 'db') {
    const ListenerCommands = async () => {

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

      if (data.command === 'delete') {
        const response = await db.deleteNote(data.content as { id: string })
        send({ data: { response, origem: 'service_worker', subject: 'db' } });
      }

    }

    ListenerCommands().catch(console.error)
  }
})

const contextMenu = new ContextMenu()

function notifyNavigation(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    communication.background.send(currentTab?.id as number, {
      source: "service_worker",
      data: {
        editor: { command: 'update' },
      },
      subject: "navigation:update",
    })
});
}

// Update contextMenu with new note is saved

contextMenu.starting()

function hookUpdate(){
  contextMenu.starting()
  notifyNavigation()
}

db.hook.create(hookUpdate)
db.hook.updating(hookUpdate)
db.hook.delete(hookUpdate)
