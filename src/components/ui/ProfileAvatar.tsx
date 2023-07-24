import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Separator from "@radix-ui/react-separator";
import { signOut, useSession } from "next-auth/react";

const ProfileAvatar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="mr-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar.Root className="flex h-12 w-12 items-center justify-center rounded-full ">
            <Avatar.Image
              src={sessionData?.user.image ?? undefined}
              className="flex h-full w-full items-center justify-center rounded-full"
            />
            <Avatar.Fallback
              delayMs={600}
              className="flex h-full w-full items-center justify-center rounded-full bg-RED_CARMINE text-2xl text-WHITE_EGG"
            >
              {sessionData?.user.name?.substring(0, 1).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mr-6 mt-6 flex flex-col gap-2 bg-WHITE_EGG py-2 pl-3 pr-12">
            <DropdownMenu.Item className="px-4 py-1">Profile</DropdownMenu.Item>
            <Separator.Root className="h-[1px] w-full bg-GRAY_CLOUD" />
            <DropdownMenu.Item className="px-4 py-1">
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="px-4 py-1"
              onClick={() => void signOut()}
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default ProfileAvatar;
