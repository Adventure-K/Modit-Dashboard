import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <>
    
    <footer className="flex flex-col items-center "><img className="object-scale-down h-12" src="./neurotype_logo2021.svg" alt="" />&copy; Neurotype Inc.</footer>
    </>
    )
}

export default Footer;
