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


export function FormatDate(dateTime:string) {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric', 
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}



export const RandomColor = [
  "#6941C6",
  "#3538CD",
  "#C11574",
  "#00A86B",
  "#FF8C00",
  "#FF5733",
  "#FFD700",
  "#4CAF50",
  "#673AB7",
]