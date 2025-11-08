import React from 'react';

// Este componente recebe o título e, como "children",
// a tag de imagem que queremos exibir.
const Hero = ({ title, children }) => {
  return (
    <div className="hero-container">
      <div className="hero-image">
        {children}
      </div>
      <div className="hero-overlay"></div>
      <h1 className="hero-title">{title}</h1>
    </div>
  );
};

export default Hero;