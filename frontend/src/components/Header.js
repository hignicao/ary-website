import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoSchoolOutline, IoPersonOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Prof. Ary Barradas</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/"><IoSchoolOutline /> Cursos</NavLink>
          </li>
          <li>
            <NavLink to="/curriculo"><IoPersonOutline /> Currículo</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;