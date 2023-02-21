import notion from "./client";

async function loadChildren(block) {
  if (block.has_children) {
    const children = (
      await notion.blocks.children.list({
        block_id: block.id,
        page_size: 100,
      })
    ).results;

    block.children = children;

    await Promise.all(children.map(loadChildren));
  }
}

export default async function loadBlockWithChildren(blockId: string) {
  const block = await notion.blocks.retrieve({
    block_id: blockId,
  });

  await loadChildren(block);

  return block;
}
