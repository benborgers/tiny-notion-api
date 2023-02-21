import normalizeNotionId from "../lib/normalizeNotionId";
import loadBlockWithChildren from "../lib/loadBlockWithChildren";

export const config = { runtime: "edge" };

export default async (req: Request) => {
  const id = normalizeNotionId(new URL(req.url).searchParams.get("id"));

  if (!id) {
    return new Response("No `id` provided.", { status: 400 });
  }

  const pageBlock = await loadBlockWithChildren(id);

  return new Response(
    JSON.stringify({
      id: pageBlock.id,
      title: pageBlock.child_page.title,
      pageBlock,
    }),
    { headers: { "content-type": "application/json" } }
  );
};
