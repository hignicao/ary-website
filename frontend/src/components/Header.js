import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Prof. Ary Barradas</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li><NavLink to="/">Cursos</NavLink></li>
          <li><NavLink to="/curriculo">Currículo</NavLink></li>
          {/* O link de Inscrição pode ser removido daqui,
              já que o fluxo principal é através do botão "Inscreva-se" nos cursos */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;