import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { LogOut, User as UserIcon } from "lucide-react";
import { Logo } from "./logo";

export function PageHeader() {
  const { user } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Logo />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
