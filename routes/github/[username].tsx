import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

/**
 * 这些操作都是异步的。然而，渲染始终是同步的。
 * 不应在渲染期间直接获取数据，而应将其加载到路由的处理函数中，然后通过 ctx.render() 的第一个参数传递给页面组件。
 * 
 * 然后可以通过页面组件上的 props.data 字段访问传递给 ctx.render() 的数据。
 * 
 * 取的的数据放在 ctx.render 中
 * 下面页面会用到这个值
 */
export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    console.log(resp);
    const user: User = await resp.json();
    console.log("=========" + user.login);
    return ctx.render(user);
  },
};

/**
 * 首先通过对 GitHub 进行 API 调用来在处理程序内部获取数据。
 * 如果 API 调用成功，数据将传递到页面组件。如果 API 调用失败，则页面组件将以 null 作为数据进行渲染。
 * 页面组件从 props 中获取数据并渲染它。
 * 
 * 使用 ctx.render 里面的值
 */
export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <img src={data.avatar_url} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
    </div>
  );
}