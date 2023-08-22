import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { getCategoryList } from "~/types/categories";

const Navbar = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] ml-16 flex w-screen">
      <NavigationMenu.List className="center  m-0 flex list-none gap-4 rounded-[6px]  py-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
            Category
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
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

        <NavigationMenu.Indicator />
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-fit ">
        <NavigationMenu.Viewport className="relative mt-[10px] h-64 w-24 origin-[top_center] overflow-hidden rounded-[6px] bg-BLACK_CYNICAL" />
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
    <li>
      <NavigationMenu.Link asChild>
        <Link href={href}>{title}</Link>
      </NavigationMenu.Link>
    </li>
  );
};

// const ListItem = React.forwardRef(
//   ({ children, title, ...props }, forwardedRef) => (
//     <li>
//       <NavigationMenu.Link asChild>
//         <a
//           className={
//             "focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors focus:shadow-[0_0_0_2px]"
//           }
//           {...props}
//           ref={forwardedRef}
//         >
//           <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
//             {title}
//           </div>
//           <p className="text-mauve11 leading-[1.4]">{children}</p>
//         </a>
//       </NavigationMenu.Link>
//     </li>
//   )
// );

export default Navbar;
