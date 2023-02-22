import normalizeNotionId from "../lib/normalizeNotionId";
import loadBlockWithChildren from "../lib/loadBlockWithChildren";
import blockToHtml from "../lib/blockToHtml";
import postprocessHtml from "../lib/postprocessHtml";

export const config = { runtime: "edge" };

export default async (req: Request) => {
  const id = normalizeNotionId(new URL(req.url).searchParams.get("id"));

  if (!id) {
    return new Response("No `id` provided.", { status: 400 });
  }

  const pageBlock = await loadBlockWithChildren(id);

  const html = postprocessHtml(blockToHtml(pageBlock));

  if (process.env.NODE_ENV === "development") {
    return new Response(
      `<meta charset="utf-8" /><link rel="stylesheet" href="/notion.css" />${html}`,
      { headers: { "content-type": "text/html" } }
    );
  }

  return new Response(
    JSON.stringify({
      id: pageBlock.id,
      title: pageBlock.child_page.title,
      html,
    }),
    { headers: { "content-type": "application/json" } }
  );
};
