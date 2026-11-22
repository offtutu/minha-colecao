
import { useState, useEffect } from "react";
import "./App.css";

import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Resumo from "./components/resumo";

function App() {
  const [lista, setLista] = useState([]);

  const [resumo, setResumo] = useState({
    total: 0,
    media_avaliacao: 0,
    melhor: null
  });

  const [erro, setErro] = useState("");

  async function buscarAlbuns() {
    const resposta = await fetch("/api/albuns/");

    if (resposta.ok) {
      const dados = await resposta.json();
      setLista(dados);
    }
  }

  async function buscarResumo() {
    const resposta = await fetch("/api/albuns/resumo/");

    if (resposta.ok) {
      const dados = await resposta.json();
      setResumo(dados);
    }
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        await buscarAlbuns();
        await buscarResumo();
      } catch {
        setErro("Não foi possível carregar os dados");
      }
    }

    carregarDados();
  }, []);

  async function adicionarAlbum(novoAlbum) {
    setErro("");

    try {
      const resposta = await fetch("/api/albuns/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoAlbum)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }

      await buscarAlbuns();
      await buscarResumo();

      return true;

    } catch {
      setErro("Não foi possível conectar ao servidor");
      return false;
    }
  }

  return (
    <div className="container">
      <h1>Minha Coleção</h1>

      <Resumo resumo={resumo} />

      <Formulario
        onAdicionar={adicionarAlbum}
        erro={erro}
      />

      <Lista albuns={lista} />
    </div>
  );
}

export default App;
