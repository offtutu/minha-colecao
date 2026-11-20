import { useState } from "react";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import "./App.css";

function App() {
  // lista de álbuns de teste (depois vai vir da API)
  const [lista, setLista] = useState([
  { id: 1, titulo: "Thriller", artista: "Michael Jackson", ano: 1982, avaliacao: 4.8 },
  { id: 2, titulo: "Abbey Road", artista: "The Beatles", ano: 1969, avaliacao: 4.9 },
  { id: 3, titulo: "Nevermind", artista: "Nirvana", ano: 1991, avaliacao: 4.7 },
]);
const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
function adicionar() {
  // monta o álbum novo com o que foi digitado
  const novoAlbum = {
    id: lista.length + 1,
    titulo: titulo,
    artista: artista,
    ano: Number(ano),
    avaliacao: Number(nota),
  };

  // coloca o álbum novo no final da lista
  setLista([...lista, novoAlbum]);

  // limpa os campos
  setTitulo("");
  setArtista("");
  setAno("");
  setNota("");
}
  return (
    <div>
      <h1>Minha Coleção</h1>
<div>
  <input
    placeholder="Título"
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
  />
  <input
    placeholder="Artista"
    value={artista}
    onChange={(e) => setArtista(e.target.value)}
  />
  <input
    placeholder="Ano"
    value={ano}
    onChange={(e) => setAno(e.target.value)}
  />
  <input
    placeholder="Nota"
    value={nota}
    onChange={(e) => setNota(e.target.value)}
  />
  <button onClick={adicionar}>Adicionar</button>
</div>
      {/* mostra cada álbum da lista */}
      {lista.map((album) => (
        <div key={album.id} className="cartao">
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
