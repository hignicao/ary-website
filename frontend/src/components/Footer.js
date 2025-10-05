import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Prof. Ary Vieira Barradas. Todos os direitos reservados.</p>
      <p>Contato: ary@ie.ufrj.br | WhatsApp: (21) 99963-5847</p>
    </footer>
  );
};

export default Footer;