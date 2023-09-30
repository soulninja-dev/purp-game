import type { ReactNode } from "react";

interface Props {
  children?: ReactNode | ReactNode[];
}

const DesktopWrapper = ({ children }: Props) => {
  return (
    <div className="flex w-full items-center justify-center bg-background pb-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};

export default DesktopWrapper;
