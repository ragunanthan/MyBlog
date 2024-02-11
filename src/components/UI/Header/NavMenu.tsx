"use client";

import { useSession } from "next-auth/react";
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


export function LoginDetail() {
  const { data: session, status: sessionStatus } = useSession();
  return  <>
  {sessionStatus === "authenticated" && <p>{session?.user?.email}</p>}
  <a href={"/login"} className="px-3 no-underline py-1 text-white bg-blue-500 rounded">
    <>{sessionStatus === "authenticated" ? "Sign Out" :'Sign In'}</>
    </a>
  </>
}