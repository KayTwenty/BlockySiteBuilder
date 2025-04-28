import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

interface Block {
  id: string;
  type: string;
  content: any;
}

interface EditorState {
  blocks: Block[];
  addBlock: (block: Block) => void;
  updateBlock: (id: string, content: any) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (oldIndex: number, newIndex: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
    })),
  updateBlock: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, content } : block
      ),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),
  moveBlock: (oldIndex, newIndex) =>
    set((state) => ({
      blocks: arrayMove(state.blocks, oldIndex, newIndex),
    })),
}));
