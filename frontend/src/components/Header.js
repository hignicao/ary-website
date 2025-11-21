import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// Importamos os ícones, mas vamos usá-los de forma discreta ou ocultá-los via CSS se preferir o visual puramente texto da EBC
import {
  IoHome,
  IoStatsChart,
  IoCalculator,
  IoPerson,
  IoHelpCircle
} from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      {/* Área Superior: Título Centralizado */}
      <div className="header-top">
        <div className="header-logo">
          <Link to="/">Prof. Ary Barradas</Link>
        </div>
      </div>

      {/* Área Inferior: Barra de Navegação (Estilo EBC) */}
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              <IoHome style={{marginBottom: '2px'}} /> Início
            </NavLink>
          </li>
          {/* Cursos Individuais nas Abas */}
          <li>
            <NavLink to="/curso/1" className={({ isActive }) => (isActive ? "active" : "")}>
              <IoCalculator style={{marginBottom: '2px'}} /> Mat. Financeira
            </NavLink>
          </li>
          <li>
            <NavLink to="/curso/2" className={({ isActive }) => (isActive ? "active" : "")}>
              <IoStatsChart style={{marginBottom: '2px'}} /> Estatística
            </NavLink>
          </li>

          <li>
            <NavLink to="/curriculo" className={({ isActive }) => (isActive ? "active" : "")}>
              <IoPerson style={{marginBottom: '2px'}} /> Currículo
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? "active" : "")}>
              <IoHelpCircle style={{marginBottom: '2px'}} /> Dúvidas
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;