import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
export default async function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
 
    
  return <section>{ session ? children : redirect('/login')}</section>;
}
