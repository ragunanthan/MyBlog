import { PageHeader } from "@/components/UI/Header/PageHeader";
import { RecentBlogs } from "./(recentBlogs)/recentBlog";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <PageHeader title="My Blog" />
      <h4 className="py-6">Recent blog posts</h4>
      <RecentBlogs />
      {children}
    </section>
  );
}
