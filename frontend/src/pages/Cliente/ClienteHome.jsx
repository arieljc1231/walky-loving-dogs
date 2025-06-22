// src/pages/Cliente/ClienteHome.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }            from 'react-router-dom';
import api                        from '../../services/api';

const formatDateTime = iso =>
  new Date(iso).toLocaleString('pt-BR', {
    day   : '2-digit',
    month : '2-digit',
    year  : 'numeric',
    hour  : '2-digit',
    minute: '2-digit'
  });

export default function ClienteHome() {
  const navigate = useNavigate();
  const [dono, setDono]         = useState(null);
  const [meusPets, setMeusPets] = useState([]);
  const [meusEventos, setMeusEventos] = useState([]);
  const [filtroPet, setFiltroPet]     = useState(null);

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuario_cliente');
    if (!usuarioStr) {
      alert('Você precisa estar logado como cliente.');
      return navigate('/login-cliente');
    }
    const usuario = JSON.parse(usuarioStr);

    // injeta token
    api.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`;

    (async () => {
      try {
        // 1) dados do dono
        const { data: donoData } = await api.get(`/donos/${usuario._id}`);
        setDono(donoData);

        // 2) pets do dono via nova rota
        const { data: petsData } = await api.get(`/pets/dono/${usuario._id}`);
        setMeusPets(petsData);

        // 3) eventos de cada pet
        const eventosPorPet = await Promise.all(
          petsData.map(pet =>
            api.get(`/eventos/pet/${pet._id}`).then(res =>
              res.data.map(evt => ({ ...evt, petName: pet.nome }))
            )
          )
        );

        const allEventos = eventosPorPet
          .flat()
          .sort((a, b) => new Date(b.dataEntrada) - new Date(a.dataEntrada));

        setMeusEventos(allEventos);

      } catch (err) {
        console.error('Erro ao carregar dados do cliente:', err);
        alert('Erro ao carregar dados. Faça login novamente.');
        navigate('/login-cliente');
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario_cliente');
    navigate('/login-cliente');
  };

  if (!dono) {
    return <div className="container mt-4"><p>Carregando perfil...</p></div>;
  }

  const eventosExibidos = filtroPet
    ? meusEventos.filter(evt => evt.pet === filtroPet)
    : meusEventos;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painel do Cliente</h2>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="row">
        {/* Coluna esquerda */}
        <div className="col-md-4">
          {/* Dados do dono */}
          <div className="card mb-4">
            <div className="card-header bg-white border-0"><h5>Meus Dados</h5></div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Nome:</strong> {dono.nome}</li>
              <li className="list-group-item"><strong>E-mail:</strong> {dono.email}</li>
              <li className="list-group-item"><strong>CPF:</strong> {dono.cpf}</li>
              <li className="list-group-item"><strong>Telefone:</strong> {dono.telefone}</li>
              <li className="list-group-item"><strong>Endereço:</strong> {dono.endereco}</li>
            </ul>
          </div>

          {/* Lista de pets */}
          <div className="card">
            <div className="card-header bg-white border-0"><h5>Meus Pets</h5></div>
            <ul className="list-group list-group-flush">
              <li
                className={`list-group-item ${!filtroPet ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setFiltroPet(null)}
              >
                Todos Pets
              </li>
              {meusPets.length === 0 && (
                <li className="list-group-item">Nenhum pet cadastrado.</li>
              )}
              {meusPets.map(pet => (
                <li
                  key={pet._id}
                  className={`list-group-item ${filtroPet === pet._id ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFiltroPet(pet._id)}
                >
                  {pet.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna direita: eventos */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-white border-0"><h5>Meus Eventos</h5></div>
            <ul className="list-group list-group-flush">
              {eventosExibidos.length === 0 ? (
                <li className="list-group-item">Nenhum evento registrado.</li>
              ) : (
                eventosExibidos.map(evt => (
                  <li key={evt._id} className="list-group-item mb-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{evt.tipo}</strong><br/>
                        <small><strong>Pet:</strong> {evt.petName}</small>
                      </div>
                      <div className="text-end">
                        <strong>Entrada:</strong> {formatDateTime(evt.dataEntrada)}<br/>
                        <strong>Saída:</strong> {evt.dataSaida
                          ? formatDateTime(evt.dataSaida)
                          : 'Em andamento'}<br/>
                        <strong>Status:</strong> {evt.status || (evt.dataSaida ? 'Concluído' : 'Ativo')}
                      </div>
                    </div>
                    {evt.observacoes && (
                      <div className="mt-2"><em>Observações:</em> {evt.observacoes}</div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
