import { PageHeader } from "@/components/UI/Header/PageHeader";
import Image from "next/image";

const getBlogs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/blogs/recent", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Home() {
  const { data } = await getBlogs();
  
  return (
    <div>
      <PageHeader title="My Blog" />
      <h4 className="py-6">Recent blog posts</h4>
      <div className=" grid grid-cols-2 gap-6">
        {data.map(
          ({
            title,
            description,
            category,
            imageUrl,
          }: {
            title: string;
            description: string;
            category: string[];
            imageUrl: string;
          }, index:number) => (
            <div className={`flex ${index === 0 && 'row-span-2 flex-col'} ${index === 3 && 'col-span-2'}`}>
              <Image
                src={imageUrl}
                alt={`Picture of the title`}
                width={500}
                height={500}
                style={{
                  width: index === 0 ? '100%' : "50%",
                  aspectRatio : index === 0 || index === 3 ? "1/0.4" : "1/.6",
                  objectFit : "cover"
                }}
              />
              <div className="flex-1 flex justify-between flex-col">
              <p>{title}</p>
              <p>{description}</p>
              {category?.map((str) =><p>{str}</p>)}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
