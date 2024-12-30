import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex-col items-center gap-6 text-4xl p-4">
      <h1>Book Manager App</h1>
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button asChild>
        <LogoutLink>Log out</LogoutLink>
      </Button>
    </main>
  );
}
