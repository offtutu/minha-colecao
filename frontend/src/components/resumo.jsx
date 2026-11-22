
function Resumo({ resumo }) {
  return (
    <div>
      <h2>Resumo da coleção</h2>

      <p>Total de álbuns: {resumo.total}</p>

      <p>
        Média das avaliações: {resumo.media_avaliacao}
      </p>

      <p>
        Melhor álbum: {resumo.melhor || "Nenhum"}
      </p>
    </div>
  );
}

export default Resumo;
