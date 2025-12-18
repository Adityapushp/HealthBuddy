import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { Logo } from "./logo";

export function PageHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const userAvatar = PlaceHolderImages.find(p => p.id === "user-avatar");

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Logo />
        <div className="flex items-center gap-4">
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
          <Avatar className="h-10 w-10">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
