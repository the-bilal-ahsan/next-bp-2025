"use client"
import Link from "next/link"
const Page =()=>{
    return(
        <>
        <Link href ="/basic-todo-claude.md">basic-todo-claude.md</Link>
        <br />
        <Link href ="/next-auth-gpt.md">next-auth-gpt.md</Link>
        <br />
        <Link href ="/git-commands.md">git-commands.md</Link>
        <br />
        <Link href ="/tanstack-query.md">tanstack-query.md</Link>
        <br />
        <Link href ="/graphql.md">graphql.md</Link>
        </>
    )
}


export default Page