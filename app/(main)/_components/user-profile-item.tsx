"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOutIcon } from "lucide-react";

import { SignOutButton, useUser } from "@clerk/clerk-react";

export const UserProfileItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex hover:bg-primary/5 w-full p-3 items-center gap-x-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="text-sm font-medium truncate">{user?.fullName}</span>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex items-center w-full gap-x-2 p-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.fullName}</span>
            <p className="text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full p-2 cursor-pointer text-muted-foreground">
          <SignOutButton>
            <div>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};