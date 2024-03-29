import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { getCategoryList } from "~/types/categories";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen">
      <NavigationMenu.List className="center  m-0 flex list-none gap-4 rounded-[6px]  py-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
            Category
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto pl-4 pt-2">
            {getCategoryList().map((category) => {
              return (
                <ListItem
                  href={`/category/${category}`}
                  title={category}
                  key={category}
                />
              );
            })}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/*<NavigationMenu.Indicator />*/}

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/search"
            className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none hover:underline"
          >
            Search
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href={
              session.status === "authenticated" ? "/my-podcasts" : "/login"
            }
            className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none hover:underline"
          >
            My Podcasts
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-fit ">
        <NavigationMenu.Viewport className="h-96 relative mt-[10px] h-64 w-48 origin-[top_center] overflow-hidden rounded-[6px] border-2 border-WHITE_EGG bg-BLACK_CYNICAL" />
      </div>
    </NavigationMenu.Root>
  );
};

interface ListItemProps {
  href: string;
  title: string;
}

const ListItem = ({ href, title }: ListItemProps) => {
  return (
    <li className="list-none hover:underline hover:text-[1.1rem]">
      <NavigationMenu.Link asChild>
        <Link href={href}>{title}</Link>
      </NavigationMenu.Link>
    </li>
  );
};

export default Navbar;
