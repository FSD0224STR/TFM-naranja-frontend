import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BreadCrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className='breadcrumb'>
      <span>
        <Link to='/' className='breadcrumb-link'>
          Home
        </Link>
      </span>
      {pathnames.map((pathname, index) => (
        <span key={index}>
          &nbsp;/&nbsp;
          <Link
            to={`/${pathnames.slice(0, index + 1).join("/")}`}
            className='breadcrumb-link'
          >
            {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
