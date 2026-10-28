import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  calcularTotalVotos,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const total = calcularTotalVotos(votos);
  const placar = calcularResultado(votos);

  function handleZerar() {
    const confirmar = window.confirm('Tem certeza que deseja zerar a votação?');

    if (!confirmar) return;

    zerarVotos();
    setVotos(obterVotos());
  }

  return (
    <main className="home">
      <section className="votacao-secao">
        <h1>Resultado</h1>

        {total === 0 ? (
          <>
            <p>Ainda não há votos para exibir.</p>
            <Link className="botao botao-principal" to="/votacao">
              Ir para votação
            </Link>
          </>
        ) : (
          <>
            <p>
              Total de votos: <strong>{total}</strong>
            </p>

            <ul className="placar-lista">
              {placar.map((item, index) => (
                <li
                  key={item.id}
                  className={index === 0 ? 'placar-item placar-lider' : 'placar-item'}
                >
                  <div className="placar-topo">
                    <strong>{item.nome}</strong>
                    {index === 0 && <span className="placar-selo">Sairia hoje</span>}
                  </div>

                  <div className="placar-meta">
                    <span>
                      {item.votos} {item.votos === 1 ? 'voto' : 'votos'}
                    </span>
                    <span>
                      {Number(item.percentual).toLocaleString('pt-BR', {
                        maximumFractionDigits: 1,
                      })}
                      %
                    </span>
                  </div>

                  <div className="placar-barra">
                    <div
                      className="placar-preenchimento"
                      style={{ width: `${item.percentual}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="resultado-acoes">
          <button type="button" className="botao botao-secundario" onClick={handleZerar}>
            Zerar votação
          </button>
        </div>
      </section>
    </main>
  );
}

export default Resultado;