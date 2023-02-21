import notion from "./client";

export default async function blockToHtml(blockId) {
  const block = await notion.blocks.retrieve({
    block_id: blockId,
  });

  let children = [];
  if (block.has_children) {
    children = (
      await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
      })
    ).results;
  }

  if (block.type === "child_page") {
    return children.map((child) => blockToHtml(child.id)).join("");
  }
}
