'use client'
import { Toggle } from '@/components/ui/toggle'
import { EditorContent, useEditor } from '@tiptap/react'
import Starterkit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'

type Props = {
  value: string
  setValue: any
  trigger: any
}

export default function DescriptionEditor({ value, setValue, trigger }: Props) {
  const editor = useEditor({
    extensions: [
      Starterkit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'min-h-[80px] w-full rounded-b-sm border-l border-r border-b border-input bg-background px-3 py-2 text-sm outline-none',
      },
    },
    content: value,
    onUpdate({ editor }) {
      setValue('description', editor.getHTML())
      trigger('description')
    },
  })

  return (
    <>
      <div className="space-x-1 space-y-1 rounded-t-sm border">
        <Toggle
          pressed={editor?.isActive('bold')}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          size="sm"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('italic')}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          size="sm"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('strike')}
          onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
          size="sm"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('bulletList')}
          onPressedChange={() =>
            editor?.chain().focus().toggleBulletList().run()
          }
          size="sm"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('orderedList')}
          onPressedChange={() =>
            editor?.chain().focus().toggleOrderedList().run()
          }
          size="sm"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
