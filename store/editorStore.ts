import { create } from "zustand";

interface Block {
  id: string;
  type: string;
  content: any;
}

interface EditorState {
  blocks: Block[];
  addBlock: (block: Block) => void;
  moveBlock: (oldIndex: number, newIndex: number) => void;
  deleteBlock: (id: string) => void;
  updateBlock: (id: string, content: any) => void;
  setBlocks: (blocks: Block[]) => void; // <-- ADD THIS
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
  moveBlock: (oldIndex, newIndex) => set((state) => {
    const updatedBlocks = [...state.blocks];
    const [moved] = updatedBlocks.splice(oldIndex, 1);
    updatedBlocks.splice(newIndex, 0, moved);
    return { blocks: updatedBlocks };
  }),
  deleteBlock: (id) => set((state) => ({
    blocks: state.blocks.filter((block) => block.id !== id),
  })),
  updateBlock: (id, content) => set((state) => ({
    blocks: state.blocks.map((block) =>
      block.id === id ? { ...block, content } : block
    ),
  })),
  setBlocks: (blocks) => set({ blocks }),
}));
