import richTextArrayToHtml from "./richTextArrayToHtml";
import colorClass from "./colorClass";

export default function blockToHtml(block): string {
  if (block.type === "child_page") {
    return block.children.map((child) => blockToHtml(child)).join("");
  }

  if (block.type === "heading_1") {
    return `<h1>${richTextArrayToHtml(block.heading_1.rich_text)}</h1>`;
  }

  if (block.type === "heading_2") {
    return `<h2>${richTextArrayToHtml(block.heading_2.rich_text)}</h2>`;
  }

  if (block.type === "heading_3") {
    return `<h3>${richTextArrayToHtml(block.heading_3.rich_text)}</h3>`;
  }

  if (block.type === "paragraph") {
    return `<p class="${colorClass(
      block.paragraph.color
    )}">${richTextArrayToHtml(block.paragraph.rich_text)}</p>${
      block.has_children
        ? `<div class="notion-indented">${block.children
            .map((child) => blockToHtml(child))
            .join("")}</div>`
        : ""
    }`;
  }

  if (
    block.type === "numbered_list_item" ||
    block.type === "bulleted_list_item"
  ) {
    const el = {
      numbered_list_item: "ol",
      bulleted_list_item: "ul",
    }[block.type];

    return `<${el}><li>${richTextArrayToHtml(
      block[block.type].rich_text
    )}</li>${
      block.has_children
        ? block.children.map((child) => blockToHtml(child)).join("")
        : ""
    }</${el}>`;
  }

  console.log("Unhandled block type:", block.type);
  return "";
}
