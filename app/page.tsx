import { SignInButton, UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <SignInButton />
      <UserButton />
    </main>
  )
}