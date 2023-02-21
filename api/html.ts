import notion from "../client";

export const config = { runtime: "edge" };

export default (req: Request) => {
  return new Response(`The time is ${new Date().toISOString()}`, {
    headers: { "content-type": "text/html" },
  });
};
