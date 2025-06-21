// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

// Login e Escolha de Painel
import EscolhaPainel from './pages/Login/EscolhaPainel';
import LoginCliente from './pages/Login/LoginCliente';
import LoginAdmin from './pages/Login/LoginAdmin';
import LoginTutor from './pages/Login/LoginTutor';

// Admin
import AdminList from './pages/Admin/AdminList';
import NovoAdmin from './pages/Admin/NovoAdmin';
import AdminDetails from './pages/Admin/AdminDetails';
import EditarAdmin from './pages/Admin/EditarAdmin';
import AdminHome from './pages/Admin/AdminHome';
import RotaProtegidaAdmin from './components/RotaProtegidaAdmin';

// Dono (via Admin)
import DonoList from './pages/Dono/DonoList';
import NovoDono from './pages/Dono/NovoDono';
import DonoDetails from './pages/Dono/DonoDetails';
import EditarDono from './pages/Dono/EditarDono';
import RotaProtegidaCliente from './components/RotaProtegidaCliente';

// Cliente (Portal)
import ClienteHome from './pages/Cliente/ClienteHome';
import NovoEventoCliente from './pages/Evento/NovoEventoCliente';

// Tutor
import TutorList from './pages/Tutor/TutorList';
import NovoTutor from './pages/Tutor/NovoTutor';
import TutorDetails from './pages/Tutor/TutorDetails';
import EditarTutor from './pages/Tutor/EditarTutor';
import TutorHome from './pages/Tutor/TutorHome';
import RotaProtegidaTutor from './components/RotaProtegidaTutor';

// Pet
import PetList from './pages/Pet/PetList';
import NovoPet from './pages/Pet/NovoPet';
import PetDetails from './pages/Pet/PetDetails';
import EditarPet from './pages/Pet/EditarPet';

// Evento (Admin)
import NovoEvento from './pages/Evento/NovoEvento';

function App() {
  return (
    <Router>
      <Routes>
        {/* Escolha e Login */}
        <Route path="/" element={<EscolhaPainel />} />
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-tutor" element={<LoginTutor />} />

        {/* Área Comum (Admin Home) */}
        <Route
          path="/home"
          element={
            <RotaProtegidaAdmin>
              <Home />
            </RotaProtegidaAdmin>
          }
        />

        {/* Admin */}
        <Route path="/admins" element={<RotaProtegidaAdmin><AdminList /></RotaProtegidaAdmin>} />
        <Route path="/admins/novo" element={<RotaProtegidaAdmin><NovoAdmin /></RotaProtegidaAdmin>} />
        <Route path="/admins/:id" element={<RotaProtegidaAdmin><AdminDetails /></RotaProtegidaAdmin>} />
        <Route path="/admins/:id/editar" element={<RotaProtegidaAdmin><EditarAdmin /></RotaProtegidaAdmin>} />
        <Route path="/admin/home" element={<RotaProtegidaAdmin><AdminHome /></RotaProtegidaAdmin>} />

        {/* Dono (via Admin) */}
        <Route path="/donos" element={<RotaProtegidaAdmin><DonoList /></RotaProtegidaAdmin>} />
        <Route path="/donos/novo" element={<RotaProtegidaAdmin><NovoDono /></RotaProtegidaAdmin>} />
        <Route path="/donos/:id" element={<RotaProtegidaAdmin><DonoDetails /></RotaProtegidaAdmin>} />
        <Route path="/donos/:id/editar" element={<RotaProtegidaAdmin><EditarDono /></RotaProtegidaAdmin>} />

        {/* Cliente (Portal) */}
        <Route path="/cliente" element={<RotaProtegidaCliente><ClienteHome /></RotaProtegidaCliente>} />
        <Route path="/cliente/home" element={<RotaProtegidaCliente><ClienteHome /></RotaProtegidaCliente>} />
        <Route path="/cliente/eventos/novo/:petId" element={<RotaProtegidaCliente><NovoEventoCliente /></RotaProtegidaCliente>} />

        {/* Tutor */}
        <Route path="/tutores" element={<RotaProtegidaAdmin><TutorList /></RotaProtegidaAdmin>} />
        <Route path="/tutores/novo" element={<RotaProtegidaAdmin><NovoTutor /></RotaProtegidaAdmin>} />
        <Route path="/tutores/:id" element={<RotaProtegidaAdmin><TutorDetails /></RotaProtegidaAdmin>} />
        <Route path="/tutores/:id/editar" element={<RotaProtegidaAdmin><EditarTutor /></RotaProtegidaAdmin>} />
        <Route path="/tutor/home" element={<RotaProtegidaTutor><TutorHome /></RotaProtegidaTutor>} />
        <Route path="/tutor/eventos/novo/:petId" element={<RotaProtegidaTutor><NovoEvento /></RotaProtegidaTutor>} />

        {/* Pet */}
        <Route path="/pets" element={<RotaProtegidaAdmin><PetList /></RotaProtegidaAdmin>} />
        <Route path="/pets/novo" element={<RotaProtegidaAdmin><NovoPet /></RotaProtegidaAdmin>} />
        <Route path="/pets/:id" element={<RotaProtegidaAdmin><PetDetails /></RotaProtegidaAdmin>} />
        <Route path="/pets/:id/editar" element={<RotaProtegidaAdmin><EditarPet /></RotaProtegidaAdmin>} />
        <Route path="/pets/:petId/novo-evento" element={<RotaProtegidaAdmin><NovoEvento /></RotaProtegidaAdmin>} />
      </Routes>
    </Router>
  );
}

export default App;
