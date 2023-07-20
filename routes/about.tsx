import { Handlers } from "$fresh/server.ts";

//
export const handler: Handlers = {
    GET(_req) {
      const uuid = crypto.randomUUID();
      return new Response(JSON.stringify(uuid), {
        headers: { "Content-Type": "application/json" },
      });
    },
  };

// 对resp 里放东西，用 await 获取 resp
/** 
export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    console.log(resp.headers);
    return resp;
  },
};

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
*/