import NavMenu from "./NavMenu";

export default function Header({
  name,
  menu,
}: {
  name: string;
  menu: { path: string; title: string }[];
}) {
  return (
    <div className="flex justify-between items-center">
      <h3>{name}</h3>
      <div className="flex gap-4">
        {menu.map((navMenu) => (
          <NavMenu key={navMenu.title} {...navMenu} />
        ))}
      </div>
    </div>
  );
}
