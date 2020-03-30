import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
  const [inpuData, setInputData] = useState({});
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      await api.post('/incidents', inpuData, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (err) {
      alert('Error ao tentar cadastrar o novo caso');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para um herói resolver isso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Volta para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={inpuData.title}
            onChange={(e) =>
              setInputData({ ...inpuData, title: e.target.value })
            }
          />
          <textarea
            placeholder="Descrição"
            value={inpuData.description}
            onChange={(e) =>
              setInputData({ ...inpuData, description: e.target.value })
            }
          />
          <input
            placeholder="Valor em reais"
            value={inpuData.value}
            onChange={(e) =>
              setInputData({ ...inpuData, value: e.target.value })
            }
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
