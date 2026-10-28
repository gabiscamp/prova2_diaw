import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { foraDaRoca, naRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao((prev) => prev + 1);
  }

  return (
    <main className="home">
      <section className="votacao-secao">
        <h1>Votação</h1>
        <h2>Quem você quer eliminar?</h2>

        <div className="grid-participantes">
          {naRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      <section className="votacao-secao">
        <h2>Demais peões</h2>

        <div className="grid-participantes">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
            />
          ))}
        </div>
      </section>

      {ultimoVoto !== null && (
        <p className="mensagem-voto">
          Você votou em <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
          <strong>
            {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}
          </strong>{' '}
          nesta sessão. <Link to="/resultado">Ver resultado</Link>.
        </p>
      )}
    </main>
  );
}

export default Votacao;