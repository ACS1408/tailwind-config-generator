import React from "react";
import Container from "../utils/Container";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="main-header fixed py-3 w-full h-20 flex items-center bg-white border-b border-b-[#ededed] z-10">
      <Container className="max-w-[1600px]">
        <Link href="/">
          <figure className="max-w-48">
            <Image
              src="/logo.svg"
              alt="ui-variables logo"
              width={251}
              height={64}
            />
          </figure>
        </Link>
      </Container>
    </header>
  );
};

export default MainHeader;
