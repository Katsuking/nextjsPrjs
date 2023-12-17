### shadcn/ui

[インストール](https://ui.shadcn.com/docs/installation/next)

```sh
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

- next.js prj

![Next.js choices](./images/next_choices.png)

- shadcn/ui

![shadcn](./images/shadcn.png)

button

```sh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form # install react hook and zod
```

#### cn について

`lib/utils.ts`に定義されているように, twMerge と clsx を使って、
tailwind のコンフリクトが発生したときでも意図したように動作させたい。

### Auth

認証には [clerk](https://clerk.com/docs/quickstarts/nextjs)を使う
( free tier で十分 )

### dark mode

[setup](https://ui.shadcn.com/docs/dark-mode/next)

```sh
npm i next-themes
npx shadcn-ui@latest add dropdown-menu
```

### DB

```sh
npm i -D prisma @prisma/client
```

after install `npx prisma init`

### env

```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=???
CLERK_SECRET_KEY=???
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL="mysql://myuser:password@localhost:3006/mydb"
```
