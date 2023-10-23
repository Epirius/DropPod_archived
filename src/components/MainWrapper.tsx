import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const MainWrapper = ({ className, children }: Props) => {
  return (
    <main className={`${className ?? ""} container mx-auto py-8`}>
      {children}
    </main>
  );
};

export default MainWrapper;
