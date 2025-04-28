import { HeroBlock } from "./blocks/HeroBlock";
import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";

export function BlockRenderer({ block }: { block: any }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock id={block.id} content={block.content} />;
    case "text":
      return <TextBlock id={block.id} content={block.content} />;
    case "image":
      return <ImageBlock id={block.id} content={block.content} />;
    default:
      return null;
  }
}