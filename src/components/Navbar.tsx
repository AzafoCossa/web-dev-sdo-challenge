import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="h1">SDO Challenge</span>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item me-3">
            <NavLink to="/" className="nav-link active" end>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <button
              className="bg-danger text-white border-0 py-2 px-4 rounded"
              onClick={() => kc.logout()}
            >
              Logout
            </button>
          </li>
        </ul>
      </header>
    </>
  );
}
