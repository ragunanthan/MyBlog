import { PageHeader } from "@/components/UI/Header/PageHeader";
import Pagination from "@/components/UI/Pagination/Pagination";
import { FormatDate, RandomColor, itemsPerPage } from "@/utils/utils";
import Image from "next/image";
import { BlogType } from "./Blog";
import { Suspense } from "react";

const getBlogs = async () => {
  try {
    const res = await fetch(process.env.BASE_URL + "/api/blogs/recent", {
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

const getItemsPerPage = async (currentPage: number) => {
  try {
    const res = await fetch(
      process.env.BASE_URL + "/api/blogs/pagination/" + currentPage,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const getTotalCount = async () => {
  try {
    const res = await fetch(
      process.env.BASE_URL + "/api/blogs/totalcount",
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Home({ searchParams }: { searchParams: any }) {
  const res = await getBlogs();

  return (
    <div>
      <PageHeader title="My Blog" />
      <h4 className="py-6">Recent blog posts</h4>
      <div className=" grid grid-cols-2 gap-8">
        {res?.data?.map(
          (
            { title, description, category, imageUrl, updatedAt }: BlogType,
            index: number
          ) => (
            <div
              key={title}
              className={`flex ${index === 0 && "row-span-2 flex-col"} ${
                index === 3 && "col-span-2"
              }`}
            >
              <Image
                src={imageUrl}
                alt={`Picture of the title`}
                width={500}
                height={500}
                style={{
                  width: index === 0 ? "100%" : "50%",
                  aspectRatio: index === 0 || index === 3 ? "1/0.4" : "1/.6",
                  objectFit: "cover",
                }}
              />
              <div
                className={`flex-1 flex justify-between flex-col  gap-2 ${
                  index === 0 ? "pt-2" : "pl-4"
                }`}
              >
                <p className="text-[#6941C6] text-sm">
                  {updatedAt ? FormatDate(updatedAt) : "No date present"}{" "}
                </p>
                <div>
                  <p className="text-md font-medium pb-2">{title}</p>
                  <p
                    className={`text-gray-600 text-sm text-justify leading-relaxed   ${
                      index === 3 ? "line-clamp-5" : "line-clamp-3"
                    }`}
                  >
                    {description}
                  </p>
                </div>
                <div className="flex gap-3">
                  {category?.map((str, index) => {
                    let color =
                      RandomColor[
                        Math.floor(Math.random() * RandomColor.length)
                      ];
                    return (
                      <p
                        className={`p-.5 px-2 text-sm rounded-2xl`}
                        style={{ backgroundColor: `${color}1A`, color: color }}
                        key={str}
                      >
                        {str}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <AllBlogPost searchParams={searchParams} />
    </div>
  );
}

async function AllBlogPost({ searchParams }: { searchParams: any }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = itemsPerPage;
  const { data } = await getItemsPerPage(page);
  const { totalCount } = await getTotalCount();

  const totalPages = Math.ceil(data.itemCount / perPage);
  const isPageOutOfRange = page > totalPages;

  return (
    <div>
      <h4 className="py-6 pt-12">All blog posts</h4>
      <div className="grid grid-cols-3 gap-8">
      <Suspense fallback={<p>loading</p>}>
        {data.map((e: any) => (
            <BlogCard {...e} key={e.title} />
          ))}
        </Suspense>
      </div>
      {isPageOutOfRange ? (
        <div>No more pages...</div>
      ) : (
        <Pagination totalPages={totalCount} currentPage={page} />
      )}
    </div>
  );
}

function BlogCard({
  title,
  description,
  category,
  imageUrl,
  updatedAt,
}: BlogType) {
  return (
    <div key={title}>
      <Image
        src={imageUrl}
        alt={`Picture of the title`}
        width={500}
        height={500}
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
          objectFit: "cover",
        }}
      />
      <div className={`flex-1 flex justify-between flex-col  gap-2 pt-2`}>
        <p className="text-[#6941C6] text-sm">
          {updatedAt ? FormatDate(updatedAt) : "No date present"}{" "}
        </p>
        <div>
          <p className="text-md font-medium pb-2">{title}</p>
          <p
            className={`text-gray-600 text-sm text-justify leading-relaxed line-clamp-3`}
          >
            {description}
          </p>
        </div>
        <div className="flex gap-3">
          {category?.map((str, index) => {
            let color =
              RandomColor[Math.floor(Math.random() * RandomColor.length)];
            return (
              <p
                className={`p-.5 px-2 text-sm rounded-2xl`}
                style={{ backgroundColor: `${color}1A`, color: color }}
                key={str}
              >
                {str}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
