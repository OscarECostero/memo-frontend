import { ReactNode } from "react";
import Image from "next/image";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative bg-[#1D3557] w-full h-screen px-16">
      <div className="absolute inset-0 z-0 top-0 h-[330px]">
        <Image
          src="/svg/waveUp.svg"
          alt="Ondas de fondo"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex items-center justify-center h-full z-10 relative">{children}</div>
    </div>
  );
};

export default Layout;
