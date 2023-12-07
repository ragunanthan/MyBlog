"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`no-underline text-black ${
        path === pathName ? "border-b-2 border-b-black font-bold" : ""
      }`}
    >
      {title}
    </Link>
  );
}
