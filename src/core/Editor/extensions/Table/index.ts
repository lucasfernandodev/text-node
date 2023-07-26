import style from './style.module.css';
import table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export const Table = [
  table.configure({
    HTMLAttributes: {
      class: style.table,
    },
  }),
  TableRow,
  TableHeader,
  TableCell,
]
