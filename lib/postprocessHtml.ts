export default function postprocessHtml(html) {
  return html.replace(/<\/ol><ol>/g, "").replace(/<\/ul><ul>/g, "");
}
