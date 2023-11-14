# social media app

_Not Next.js_
(使うレポジトリちゃうくね?)

- appwrite (free tier)
- react query ( tanstack )
- react context API
- tailwindcss
- react router with outlet

## .env.local

check appwrite!

```sh
VITE_APPWRITE_URL=''
VITE_APPWRITE_PROJECT_ID=''
VITE_APPWRITE_STORAGE_ID=''
VITE_APPWRITE_DATABASE_ID=''
VITE_APPWRITE_SAVES_COLLECTION_ID=''
VITE_APPWRITE_POST_COLLECTION_ID=''
VITE_APPWRITE_USER_COLLECTION_ID=''
```

## vite setup

```sh
npm create vite@latest ./ # select TS
npm i
rm -rf src/ # 一旦すべて削除
```

main.tsx

```tsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

App.tsx

```tsx
// rafce

const App = () => {
  return <div>App</div>;
};

export default App;
```

- tailwindcss with vite

[vite setup](https://tailwindcss.com/docs/guides/vite)

```sh
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p
```

### react router

```sh
npm install react-router-dom
```

### shadcn/ui

[vite](https://ui.shadcn.com/docs/installation/vite)

```sh
npm i -D @types/node
npx shadcn-ui@latest init # 選択は下記の画像の通り
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add toast # pop-up message
npx shadcn-ui@latest add textarea
```

app/ ではなくて、src/なので注意
![vite setup options](./images/vitesetup.png)

### appwrite

```sh
npm i appwrite
```

- DB: collections relationship

下記はどちらも two-way relationship

![relationship](/images/collection_relationship.png)

- users(like) <-> posts(liked)

![like](/images/like.png)

- caption

![caption](/images/caption.png)

- index caption

![caption_index](/images/caption_index.png)

Users の imaageId は、profile 画像を削除するために必要

### react query

メイントピック
Not only simplify fetching but also caching, infinite scroll and more...

[useQuery と useMutation の違い](https://stackoverflow.com/questions/64700944/react-query-whats-the-difference-between-usequery-and-usemutation-hook)

参考)
どれだけ便利か理解する

- [サンプルを通してみる query key の重要性と便利さ](https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array)

- [initial query data](https://tanstack.com/query/latest/docs/react/guides/initial-query-data#initial-data-from-cache)

```sh
npm i @tanstack/react-query
```

### file upload

[react-dropzone usage](https://www.npmjs.com/package/react-dropzone#usage)

```sh
npm i react-dropzone
```
