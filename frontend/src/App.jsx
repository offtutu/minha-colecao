import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  // lista de álbuns de teste (depois vai vir da API)
  const lista = [
    { id: 1, titulo: "Thriller", artista: "Michael Jackson", ano: 1982, avaliacao: 4.8 },
    { id: 2, titulo: "Abbey Road", artista: "The Beatles", ano: 1969, avaliacao: 4.9 },
    { id: 3, titulo: "Nevermind", artista: "Nirvana", ano: 1991, avaliacao: 4.7 },
  ];

  return (
    <div>
      <h1>Minha Coleção</h1>

      {/* mostra cada álbum da lista */}
      {lista.map((album) => (
        <div key={album.id}>
          <h2>{album.titulo}</h2>
          <p>Artista: {album.artista}</p>
          <p>Ano: {album.ano}</p>
          <p>Nota: {album.avaliacao}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
