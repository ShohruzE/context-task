import { Outlet, NavLink } from "react-router";

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl">Courses</h1>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses/create" className="text-white">
                Create Course
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
