Perfect 🚀
I’ll give you a **complete GraphQL setup for Next.js (TypeScript)** including:

* GraphQL **backend setup** (Apollo Server or Yoga in Next.js API routes)
* GraphQL **frontend setup** (Apollo Client)
* **Queries, Mutations, and Subscriptions** examples
* **TypeScript typing** support

---

# 📌 Step 1: Install Dependencies

```bash
npm install @apollo/client graphql
npm install apollo-server-micro graphql-ws ws
npm install @graphql-tools/schema
```

---

# 📌 Step 2: Define Schema (`/graphql/schema.ts`)

```ts
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }

  type Subscription {
    userAdded: User!
  }
`;

let users = [
  { id: "1", name: "Bilal", email: "bilal@example.com" },
  { id: "2", name: "Ali", email: "ali@example.com" },
];

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(u => u.id === id),
  },
  Mutation: {
    addUser: (_: any, { name, email }: { name: string; email: string }) => {
      const user = { id: String(users.length + 1), name, email };
      users.push(user);
      pubsub.publish("USER_ADDED", { userAdded: user });
      return user;
    },
    updateUser: (_: any, { id, name, email }: { id: string; name?: string; email?: string }) => {
      const user = users.find(u => u.id === id);
      if (!user) throw new Error("User not found");
      if (name) user.name = name;
      if (email) user.email = email;
      return user;
    },
    deleteUser: (_: any, { id }: { id: string }) => {
      users = users.filter(u => u.id !== id);
      return true;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
```

---

# 📌 Step 3: Apollo Server API Route (`/pages/api/graphql.ts`)

```ts
import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import Cors from "micro-cors";

const cors = Cors();

const server = new ApolloServer({ schema });

const startServer = server.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
```

---

# 📌 Step 4: Apollo Client (`/lib/apolloClient.ts`)

```ts
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:3000/api/graphql",
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
```

---

# 📌 Step 5: Wrap App with Apollo (`/pages/_app.tsx`)

```tsx
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
```

---

# 📌 Step 6: Example Usage in Components

### 🔹 Query

```tsx
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <ul>
      {data.users.map((u: any) => (
        <li key={u.id}>{u.name} - {u.email}</li>
      ))}
    </ul>
  );
}
```

---

### 🔹 Mutation

```tsx
import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function AddUser() {
  const [addUser] = useMutation(ADD_USER);

  return (
    <button
      onClick={() => addUser({ variables: { name: "New User", email: "test@test.com" } })}
    >
      Add User
    </button>
  );
}
```

---

### 🔹 Subscription

```tsx
import { gql, useSubscription } from "@apollo/client";

const USER_ADDED = gql`
  subscription {
    userAdded {
      id
      name
      email
    }
  }
`;

export default function UserSubscription() {
  const { data, loading } = useSubscription(USER_ADDED);

  if (loading) return <p>Waiting for new users...</p>;

  return <p>New User: {data.userAdded.name}</p>;
}
```

---

✅ Now you have **full GraphQL setup in Next.js with TypeScript** including:

* Queries
* Mutations
* Subscriptions
* SSR-friendly API route

---

Do you want me to also extend this with **Next.js App Router (`app/` dir)** instead of `pages/` so it works with the latest Next.js 14+ setup?
