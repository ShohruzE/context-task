import { NavLink } from "react-router";

const links = [
  {
    path: "/courses",
    text: "Courses",
  },
  {
    path: "/create",
    text: "Create",
  },
];

export default function Navbar() {
  return (
    <>
      <nav className="bg-black p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <NavLink to="/">Context</NavLink>
          </h1>
          <ul className="flex space-x-8">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold hover:underline"
                      : "text-white hover:underline rounded-sm px-2 py-2 hover:bg-black/50"
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
