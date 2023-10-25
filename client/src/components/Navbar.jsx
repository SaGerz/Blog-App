import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to={"/"} className="logo">
        MyLogo
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create New Post</Link>
            <a onClick={logout}>Log Out</a>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
