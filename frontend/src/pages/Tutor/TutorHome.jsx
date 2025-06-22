// src/pages/Tutor/TutorHome.jsx
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const formatDateTime = iso =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

export default function TutorHome() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const tutorJson = localStorage.getItem('usuario_tutor');
    if (!tutorJson) {
      console.warn('⚠️ Nenhum tutor encontrado no localStorage');
      navigate('/login-tutor');
      return;
    }

    const tutor = JSON.parse(tutorJson);
    console.log('👤 Tutor logado:', tutor);

    if (tutor.token) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + tutor.token;
    } else {
      console.warn('⚠️ Token do tutor ausente');
    }

    // Carrega pets do tutor
    api.get(`/pets/tutor/${tutor._id}`)
      .then(response => {
        console.log('📥 Resposta da API de pets:', response);
        const data = response.data;
        setPets(data);
        console.log('🐶 Pets recebidos e setados no estado:', data);

        if (data.length > 0) {
          setSelectedPet(data[0]._id);
          console.log('✅ Primeiro pet selecionado:', data[0]._id);
        } else {
          console.warn('⚠️ Nenhum pet encontrado para o tutor.');
        }
      })
      .catch(err => {
        console.error('❌ Erro ao buscar pets do tutor:', err);
      });
  }, [navigate]);

  useEffect(() => {
    if (!selectedPet) {
      setEventos([]);
      console.log('ℹ️ Nenhum pet selecionado, limpando eventos.');
      return;
    }

    api.get(`/eventos/pet/${selectedPet}`)
      .then(({ data }) => {
        console.log('📋 Eventos recebidos:', data);
        setEventos(data);
      })
      .catch(err => {
        console.error('❌ Erro ao carregar eventos do pet:', err);
      });
  }, [selectedPet]);

  const handleCheckIn = () => {
    if (!selectedPet) return;
    navigate(`/tutor/eventos/novo/${selectedPet}`);
  };

  const handleCheckOut = id => {
    api.put(`/eventos/${id}/checkout`, { dataSaida: new Date().toISOString() })
      .then(({ data }) => {
        setEventos(evts =>
          evts.map(evt =>
            evt._id === id
              ? { ...evt, dataSaida: data.dataSaida, status: data.status }
              : evt
          )
        );
      })
      .catch(() => alert('Falha ao executar check-out'));
  };

  const handleLogout = () => {
    ['usuario_admin', 'usuario_tutor', 'usuario_cliente', 'token', 'user', 'logado']
      .forEach(k => localStorage.removeItem(k));
    navigate('/');
  };

  const getPetName = petId => {
    const pet = pets.find(p => String(p._id) === String(petId));
    return pet ? pet.nome : '—';
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painel do Tutor</h2>
        <Button variant="danger" onClick={handleLogout}>Sair</Button>
      </div>

      <div className="row">
        {/* Lista de Pets */}
        <div className="col-md-4">
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white border-0">
              <h5 className="mb-0">Meus Pets</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {pets.length === 0 && (
                <ListGroup.Item>Nenhum pet encontrado.</ListGroup.Item>
              )}
              {pets.map(p => (
                <ListGroup.Item
                  key={p._id}
                  action
                  active={p._id === selectedPet}
                  onClick={() => setSelectedPet(p._id)}
                >
                  {p.nome}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>

        {/* Eventos do Pet */}
        <div className="col-md-8">
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Meus Eventos</h5>
              <Button
                variant="success"
                size="sm"
                onClick={handleCheckIn}
                disabled={!selectedPet}
              >
                Check-in
              </Button>
            </Card.Header>

            <ListGroup variant="flush">
              {eventos.length === 0 && (
                <ListGroup.Item>Nenhum evento registrado.</ListGroup.Item>
              )}
              {eventos.map(evt => (
                <ListGroup.Item
                  key={evt._id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="w-100">
                    <div>
                      <strong>{evt.tipo}</strong> —<br />
                      <strong>Pet:</strong> {getPetName(evt.pet)}<br />
                      Entrada: {formatDateTime(evt.dataEntrada)}<br />
                      Saída:{' '}
                      {evt.dataSaida
                        ? formatDateTime(evt.dataSaida)
                        : '—'}<br />
                      Status: {evt.status}
                    </div>

                    {evt.observacoes && (
                      <div
                        className="mt-2 ps-2 border-start"
                        style={{
                          wordBreak: 'break-word',
                          maxWidth: '100%',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        <em>Obs:</em> {evt.observacoes}
                      </div>
                    )}
                  </div>

                  {!evt.dataSaida && (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleCheckOut(evt._id)}
                      className="ms-3 align-self-center"
                    >
                      Check-out
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}
