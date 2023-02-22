export default function richTextArrayToHtml(richTextArray): string {
  let html = "";

  for (const chunk of richTextArray) {
    let chunkHtml = chunk.text.content;

    if (chunk.annotations.bold) {
      chunkHtml = `<strong>${chunkHtml}</strong>`;
    }

    if (chunk.annotations.italic) {
      chunkHtml = `<em>${chunkHtml}</em>`;
    }

    if (chunk.annotations.code) {
      chunkHtml = `<code>${chunkHtml}</code>`;
    }

    html += chunkHtml;
  }

  return html;
}
