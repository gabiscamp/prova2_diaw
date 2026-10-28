function ParticipanteCard({ participante, onVotar }) {
  return (
    <article className="participante-card">
      <img src={participante.foto} alt={participante.nome} />
      <h3>{participante.nome}</h3>

      {onVotar && (
        <button
          type="button"
          className="botao botao-principal"
          onClick={() => onVotar(participante)}
        >
          Votar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;