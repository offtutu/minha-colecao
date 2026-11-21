import { useState, useEffect } from "react";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import "./App.css";

function App() {
  // lista de álbuns de teste (depois vai vir da API)
  const [lista, setLista] = useState([]);

useEffect(() => {
  fetch("/api/albuns/")
    .then((resposta) => resposta.json())
    .then((dados) => setLista(dados));
}, []);
const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
async function adicionar() {
  // monta o álbum com o que foi digitado
  const novoAlbum = {
    titulo: titulo,
    artista: artista,
    ano: Number(ano),
    avaliacao: Number(nota),
  };

  // manda pro Django salvar no banco
  const resposta = await fetch("/api/albuns/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoAlbum),
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    // deu certo: coloca o álbum na lista e limpa os campos
    setLista([...lista, dados]);
    setTitulo("");
    setArtista("");
    setAno("");
    setNota("");
  } else {
    // deu erro: mostra a mensagem do Django
    alert(dados.erro);
  }
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
