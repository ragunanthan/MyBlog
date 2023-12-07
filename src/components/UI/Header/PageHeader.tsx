export function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex border-y  py-3 justify-center text-justify ">
      <h1 className=" uppercase text-justify text-6xl sm:text-2xl text-justify md:text-3xl lg:text-4xl xl:text-6xl">
        {title}
      </h1>
    </div>
  );
}
