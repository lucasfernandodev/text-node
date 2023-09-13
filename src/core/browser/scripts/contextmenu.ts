import { db } from "../../../database/dexie";
import { communication } from "../../../utils/browser/communication";

export interface IContextMenuMessage{
  editor: {
    id?: string, 
    command: 'new' | 'open'
  }
}

export class ContextMenu{
  private source = 'service_worker'
  private subject = 'contextmenu:event'

  private async create(){
    chrome.contextMenus.removeAll();

    const data = await db.getAllNotes()
    console.log('data:context:menu', data)
  
    chrome.contextMenus.create({
      "title": 'Create Note',
      "contexts": ["all"],
      "id": "newNote"
    });

    if (data.length !== 0) {
      const parent = chrome.contextMenus.create({
        "title": 'Open',
        "id": "note:open"
      });
  
      for (const note of data) {
        chrome.contextMenus.create({
          title: `${note.title}`,
          parentId: parent,
          id: note.id
        });
      }
    }
  }

  private listener(){
    const message = {
      source: this.source as 'service_worker',
      subject: this.subject,
      data: {} as IContextMenuMessage
    }

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
      if(tab === undefined || tab.id === undefined) return;

      if(info.menuItemId === 'newNote'){
        message.data = {
          editor: { command: 'new' },
        }
      }

      if(info.parentMenuItemId === 'note:open'){
        message.data = {
          editor: { id: info.menuItemId as string, command: 'open' },
        }
      }

      communication.background.send<IContextMenuMessage>(tab.id, message)
      
    })
  }

  public starting(){
    const createContextMenu: () => void = () => {
      this.create().catch(console.error)
    }
    
    chrome.runtime.onInstalled.addListener(createContextMenu);
    createContextMenu()
    this.listener()
  }
}