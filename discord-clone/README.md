This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
