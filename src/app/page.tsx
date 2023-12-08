import { PageHeader } from "@/components/UI/Header/PageHeader";
import Image from "next/image";

const getBlogs = async () => {
  console.log(process.env.port);
  
  try {
    const res = await fetch(process.env.BASE_URL+"/api/blogs/recent", {
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
  const res = await getBlogs();
  
  return (
    <div>
      <PageHeader title="My Blog" />
      <h4 className="py-6">Recent blog posts</h4>
      <div className=" grid grid-cols-2 gap-6">
        {res?.data?.map(
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
            <div key={title} className={`flex ${index === 0 && 'row-span-2 flex-col'} ${index === 3 && 'col-span-2'}`}>
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
              <div className="flex-1 flex justify-between flex-col py-2 px-4">
                <p className="text-blue-700">sun </p>
              <div>
                <p className="text-md font-medium pb-2">{title}</p>
                <p className={`text-grey-300 line-clamp-${index === 3 ? 5 : 3}`}>{description}</p>
              </div>
              <div className="flex gap-2">{category?.map((str) =><p className="p-.5 px-2 bg-[grey] rounded-2xl" key={str}>{str}</p>)}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
