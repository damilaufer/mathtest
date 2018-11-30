import React from 'react';

import Maya from './Maya.jpg';
import Dani from './Dani.jpg';

function Face(props) {
  const src = props.name === 'Maya' ? Maya : Dani;
  return (
    <img
      src={src}
      className="App-logo"
      alt={props.name}
      onClick={() => props.onClick(props.name)}
    />
  )
}

export { Face }
