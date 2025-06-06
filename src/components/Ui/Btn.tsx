import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className: string;
  width?: "w-full" | "w-fit";
}

function Btn({ children, className, width = "w-full", ...rest }: Iprops) {
  return (
    <button
      className={`${className} ${width} p-2 rounded-md text-white cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Btn;
