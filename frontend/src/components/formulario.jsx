
import { useState } from "react";

function Formulario({ onAdicionar, erro }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");

  async function cadastrar() {
    const novoAlbum = {
      titulo: titulo,
      artista: artista,
      ano: Number(ano),
      avaliacao: Number(avaliacao)
    };

    const sucesso = await onAdicionar(novoAlbum);

    if (sucesso) {
      setTitulo("");
      setArtista("");
      setAno("");
      setAvaliacao("");
    }
  }

  return (
    <div>
      <h2>Cadastrar álbum</h2>

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
        type="number"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <input
        placeholder="Avaliação"
        type="number"
        step="0.1"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
      />

      <button onClick={cadastrar}>
        Adicionar álbum
      </button>

      {erro && (
        <p style={{ color: "red" }}>
          {erro}
        </p>
      )}
    </div>
  );
}

export default Formulario;
