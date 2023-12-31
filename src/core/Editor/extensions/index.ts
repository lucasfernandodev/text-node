import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import Text from '@tiptap/extension-text'
import { Link } from './Link';
import { Focus } from './Focus';
import { Image } from './Image';
import { CodeBlock } from './CodeBlock';
import { Dropcursor } from './Dropcursor';
import { Placeholder } from './Placeholder';
import { Title } from './Title';
import { CustomDocument } from './CustomDocument';
import ImageBase from '../Nodes/ImageBase/image';

export const extensions = [
  ...CustomDocument,
  StarterKit.configure({
    document: false,
    heading: false,
    text: false,
    dropcursor: false,
    codeBlock: false
  }),
  ...Title,
  Heading.configure({
    levels: [1, 2, 3]
  }),
  Text,
  ImageBase,
  ...Placeholder,
  ...Dropcursor,
  ...CodeBlock,
  ...Image,
  ...Focus,
  ...Link
]
