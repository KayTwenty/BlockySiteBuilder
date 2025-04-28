import { TextBlock } from "@/components/blocks/TextBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";

export function BlockRenderer({
  block,
  editing = false,
}: {
  block: any;
  editing?: boolean;
}) {
  switch (block.type) {
    case "hero":
      return (
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-1 rounded-2xl">
          <HeroBlock id={block.id} content={block.content} editing={editing} />
        </div>
      );

    case "text":
      return (
        <div className="bg-blue-50 p-1 rounded-2xl">
          <TextBlock id={block.id} content={block.content} editing={editing} />
        </div>
      );

    case "image":
      return (
        <div className="bg-green-50 p-1 rounded-2xl">
          <ImageBlock id={block.id} content={block.content} editing={editing} />
        </div>
      );

    default:
      return null;
  }
}
