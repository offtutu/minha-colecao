
import { useState } from "react";

function Lista({ albuns }) {
  const [busca, setBusca] = useState("");

  const albunsFiltrados = albuns.filter((album) =>
    album.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h2>Minha coleção</h2>

      <input
        placeholder="Buscar álbum..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {albunsFiltrados.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        albunsFiltrados.map((album) => (
          <div key={album.id} className="cartao">
            <h3>{album.titulo}</h3>
            <p>Artista: {album.artista}</p>
            <p>Ano: {album.ano}</p>
            <p>Avaliação: {album.avaliacao}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Lista;
