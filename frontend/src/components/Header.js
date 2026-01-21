import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  IoHome,
  IoStatsChart,
  IoCalculator,
  IoPerson,
  IoHelpCircle,
  IoMenu,
  IoClose
} from "react-icons/io5";

import logo from '../assets/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-content-wrapper">

          {/* LOGO: Agora é uma imagem */}
          <div className="header-logo">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="Prof. Ary Barradas"
                className="logo-image"
              />
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
              <IoHome style={{marginBottom: '2px'}} /> Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/curso/1" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
              <IoCalculator style={{marginBottom: '2px'}} /> Mat. Financeira
            </NavLink>
          </li>
          <li>
            <NavLink to="/curso/2" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
              <IoStatsChart style={{marginBottom: '2px'}} /> Estatística
            </NavLink>
          </li>
          <li>
            <NavLink to="/curriculo" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
              <IoPerson style={{marginBottom: '2px'}} /> Currículo
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
              <IoHelpCircle style={{marginBottom: '2px'}} /> Dúvidas
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;