import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/challenge1">challenge1</Link>
          </li>
          <li>
            <Link to="/challenge2">challenge2</Link>
          </li>
          <li>
            <Link to="/challenge3">challenge3</Link>
          </li>
          <li>
            <Link to="/challenge4">challenge4</Link>
          </li>
          <li>
            <Link to="/challenge5">challenge5</Link>
          </li>
          <li>
            <Link to="/challenge6">challenge6</Link>
          </li>
          <li>
            <Link to="/challenge7">challenge7</Link>
          </li>
          <li>
            <Link to="/challenge8">challenge8</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;