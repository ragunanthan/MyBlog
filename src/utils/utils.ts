import { headers } from 'next/headers';


export function getPathName() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');    
    return pathname;
}
export const menuItems : { title : string; path : string; }[] = [
    { title: "Blogs", path: "/" },
    { title: "Projects", path: "/projects" },
    {
      title: "About",
      path: "/about",
    },
    { title: "Add Blog", path: "/addNewBlog" },
  ];