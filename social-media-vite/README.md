# social media app

_Not Next.js_
(使うレポジトリちゃうくね?)

- appwrite (free tier)
- react query ( tanstack )
- react context API
- tailwindcss
- react router with outlet

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
