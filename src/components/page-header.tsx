import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "./logo";

export function PageHeader() {
  const userAvatar = PlaceHolderImages.find(p => p.id === "user-avatar");

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Logo />
        <Avatar className="h-10 w-10">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} />}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
