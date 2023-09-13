import { communication } from "../../../utils/browser/communication";
import {  db } from "../../../database/dexie";
import { ContextMenu } from "./contextmenu";
import { query } from "../../../database/notes";


query.notes.executeQueryesByMessage()

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

db.hook.create(() => hookUpdate())
db.hook.updating(() => hookUpdate())
db.hook.delete(() => hookUpdate())
