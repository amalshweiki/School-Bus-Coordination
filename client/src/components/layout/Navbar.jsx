import { Link } from "react-router-dom";
import { useGlobalAuthContext } from "../../hooks/useGlobalAuthContext";
import logo from "../../images/logo.png";
import "../../style/navbar.css";

const Navbar = () => {
  const { user, loading, logout } = useGlobalAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <Link to="/schools">
          <li>Schools</li>
        </Link>
        <Link to="/buses">
          <li>Buses</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>

        <div className="log-in-and-out">
          {user && !loading ? (
            <>
              <p className="user-name">{`Hello ${user.name}`}</p>
              <Link to="/" className=" logout" onClick={logout}>
                <li> Log Out</li>
              </Link>
            </>
          ) : (
            <Link to="/auth" className="login">
              <li> Log In</li>
            </Link>
          )}
        </div>

        <li>
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
