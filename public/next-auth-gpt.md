Basic Next Auth


Perfect 👍 Let’s build a **basic Next.js + NextAuth.js app** that supports:

* **Private routing (protected pages)**
* **Custom Email/Username + Password authentication** (via Credentials Provider)
* **Google, GitHub, LinkedIn OAuth**
* **Session handling with JWT**

I’ll give you a **starter template** with TypeScript.

---

## 1️⃣ Install dependencies

```bash
npm install next-auth @next-auth/prisma-adapter @prisma/client prisma bcrypt
```

For OAuth providers:

```bash
npm install @next-auth/providers
```

---

## 2️⃣ Setup Prisma (for database storage)

Initialize Prisma:

```bash
npx prisma init
```

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql" // or mysql/sqlite
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String?  @unique
  password      String?
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Run migration:

```bash
npx prisma migrate dev --name init
```

---

## 3️⃣ Configure NextAuth

Create `app/api/auth/[...nextauth]/route.ts` (for Next.js 13+ App Router):

```ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) (session.user as any).id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 4️⃣ Prisma Client (`lib/prisma.ts`)

```ts
import { PrismaClient } from "@prisma/client";

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
```

---

## 5️⃣ Protect Private Routes

Create a wrapper HOC `components/ProtectedRoute.tsx`:

```tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
```

Usage in a page:

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Welcome to your dashboard 🚀</h1>
    </ProtectedRoute>
  );
}
```

---

## 6️⃣ Login Page Example (`app/login/page.tsx`)

```tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-xl font-bold">Login</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </button>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => signIn("linkedin")}
      >
        Sign in with LinkedIn
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
          const password = (e.currentTarget.elements[1] as HTMLInputElement)
            .value;
          signIn("credentials", { email, password, callbackUrl: "/dashboard" });
        }}
        className="flex flex-col gap-2"
      >
        <input type="email" placeholder="Email" className="border p-2" />
        <input type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          Sign in with Email
        </button>
      </form>
    </div>
  );
}
```

---

✅ Now you have:

* **OAuth (Google, GitHub, LinkedIn)**
* **Email/Password login**
* **Protected dashboard**
* **NextAuth + Prisma + JWT session handling**

---

👉 Do you want me to also **add registration (sign-up) flow** for the email/password users (with password hashing & Prisma)?

# yes without prisma


Got it 👍 You want a **NextAuth + Next.js authentication system with email/username+password and OAuth providers** — but **without Prisma**.
We’ll use a **custom database layer** (could be MongoDB, MySQL, or even an in-memory array for demo). I’ll show you with **MongoDB + Mongoose**, since it’s common with Next.js.

---

## 1️⃣ Install dependencies

```bash
npm install next-auth @next-auth/mongodb-adapter mongoose bcrypt
```

---

## 2️⃣ Setup MongoDB Connection (`lib/mongodb.ts`)

```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI env variable");

let cached = global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## 3️⃣ User Model (`models/User.ts`)

```ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
```

---

## 4️⃣ NextAuth Config (`app/api/auth/[...nextauth]/route.ts`)

```ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user || !user.password) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (token) (session.user as any).id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 5️⃣ Register API (`app/api/register/route.ts`)

```ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered", user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

---

## 6️⃣ Protected Route (`components/ProtectedRoute.tsx`)

```tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
```

---

## 7️⃣ Login Page Example (`app/login/page.tsx`)

```tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4 mt-10 items-center">
      <h1 className="text-xl font-bold">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", { email, password, callbackUrl: "/dashboard" });
        }}
        className="flex flex-col gap-2"
      >
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Login</button>
      </form>

      <button className="bg-blue-600 text-white px-4 py-2" onClick={() => signIn("google")}>
        Sign in with Google
      </button>
      <button className="bg-gray-800 text-white px-4 py-2" onClick={() => signIn("github")}>
        Sign in with GitHub
      </button>
      <button className="bg-blue-700 text-white px-4 py-2" onClick={() => signIn("linkedin")}>
        Sign in with LinkedIn
      </button>
    </div>
  );
}
```

---

✅ This setup gives you:

* **MongoDB for storage** (instead of Prisma)
* **Registration API with password hashing**
* **Login via Credentials + OAuth (Google, GitHub, LinkedIn)**
* **JWT sessions**
* **Protected routes**

---

Do you want me to also add a **Signup UI form** (Next.js page with `fetch("/api/register")`) so users can register directly from the frontend?
