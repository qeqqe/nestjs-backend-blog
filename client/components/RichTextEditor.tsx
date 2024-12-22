"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import { Button } from "@nextui-org/button";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiCode,
  FiType,
} from "react-icons/fi";
import { FaHeading } from "react-icons/fa6";
const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-2 bg-zinc-800/50 rounded-lg">
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-zinc-600" : ""}
      >
        <FiBold />
      </Button>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-zinc-600" : ""}
      >
        <FiItalic />
      </Button>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading") ? "bg-zinc-600" : ""}
      >
        <FaHeading />{" "}
      </Button>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-zinc-600" : ""}
      >
        <FiList />
      </Button>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-zinc-600" : ""}
      >
        <FiCode />
      </Button>
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[200px] focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full border border-zinc-700 rounded-lg bg-zinc-900/50">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
