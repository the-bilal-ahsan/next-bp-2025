Perfect 👍
Here’s a **comprehensive TanStack Query (React Query v5)** reference with **functions + their usage examples**. You can drop this in your `.md` file.

---

# 📌 TanStack Query Cheat Sheet

TanStack Query helps with **server state management**: fetching, caching, synchronizing, and updating data in React/Next.js apps.

---

## 🔹 Setup

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## 🔹 Fetching Data: `useQuery`

```tsx
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return <div>{data.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
```

✅ `queryKey` = unique identifier
✅ `queryFn` = function that returns a promise

---

## 🔹 Mutations: `useMutation`

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Refetch users
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'Bilal' })}>
      Add User
    </button>
  );
}
```

---

## 🔹 QueryClient Functions

```tsx
const queryClient = useQueryClient();

queryClient.invalidateQueries({ queryKey: ['users'] }); // Refetch users
queryClient.refetchQueries({ queryKey: ['users'] });    // Force refetch
queryClient.setQueryData(['user', 1], { id: 1, name: "Ali" }); // Manually update cache
queryClient.getQueryData(['users']); // Get cached data
queryClient.removeQueries(['users']); // Remove from cache
```

---

## 🔹 Query Options

```tsx
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  enabled: true,               // Disable/enable fetching
  staleTime: 1000 * 60 * 5,    // 5 mins, prevents auto-refetch
  cacheTime: 1000 * 60 * 30,   // 30 mins, keeps data in cache
  refetchOnWindowFocus: true,  // Refetch when window is focused
  retry: 3,                    // Retry failed requests 3 times
  select: (data) => data.map(u => u.name), // Transform response
});
```

---

## 🔹 Parallel Queries

```tsx
const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
```

---

## 🔹 Dependent Queries

```tsx
const userQuery = useQuery({ queryKey: ['user', id], queryFn: () => fetchUser(id) });

const postsQuery = useQuery({
  queryKey: ['posts', userQuery.data?.id],
  queryFn: () => fetchPosts(userQuery.data.id),
  enabled: !!userQuery.data, // Wait until user is loaded
});
```

---

## 🔹 Infinite Queries

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: ({ pageParam = 1 }) => fetch(`/api/projects?page=${pageParam}`).then(r => r.json()),
  getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
});
```

---

## 🔹 Prefetching Data

```tsx
queryClient.prefetchQuery({
  queryKey: ['user', 1],
  queryFn: () => fetchUser(1)
});
```

---

## 🔹 Hydration (Next.js SSR)

```tsx
import { Hydrate, dehydrate } from '@tanstack/react-query';

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchUsers });
  
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Page({ dehydratedState }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Users />
      </Hydrate>
    </QueryClientProvider>
  );
}
```

---

## 🔹 Devtools

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

✅ With these, you can handle **CRUD, caching, pagination, SSR, parallel/dependent queries, and mutations**.

Do you want me to also create a **ready-to-use boilerplate for Next.js 14 with TanStack Query + basic CRUD (GET, POST, PUT, DELETE)** so you can plug it into your projects quickly?
