export const templates = [
    {
      id: "blank",
      name: "Blank Site",
      description: "Start with an empty canvas",
      blocks: [],
    },
    {
      id: "simple-landing",
      name: "Simple Landing",
      description: "Hero + Text + Image",
      blocks: [
        { id: "hero-1", type: "hero", content: { heading: "Welcome to Your Site", subheading: "Let's get started." } },
        { id: "text-1", type: "text", content: { paragraph: "This is a simple text block." } },
        { id: "image-1", type: "image", content: { url: "https://via.placeholder.com/800x400" } },
      ],
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Hero + 2 Image Blocks",
      blocks: [
        { id: "hero-2", type: "hero", content: { heading: "My Portfolio", subheading: "Projects I'm proud of" } },
        { id: "image-2", type: "image", content: { url: "https://via.placeholder.com/400x400" } },
        { id: "image-3", type: "image", content: { url: "https://via.placeholder.com/400x400" } },
      ],
    },
  ];
  