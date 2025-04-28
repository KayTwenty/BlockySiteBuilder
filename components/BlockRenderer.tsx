import { TextBlock } from "@/components/blocks/TextBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";

export function BlockRenderer({ block, editing = false }: { block: any; editing?: boolean }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock id={block.id} content={block.content} editing={editing} />;
    case "text":
      return <TextBlock id={block.id} content={block.content} editing={editing} />;
    case "image":
      return <ImageBlock id={block.id} content={block.content} editing={editing} />;
    default:
      return null;
  }
}
