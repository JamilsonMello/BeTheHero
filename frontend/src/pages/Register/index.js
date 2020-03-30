import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
  const [inputData, setInputData] = useState({});

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post('/ongs', inputData);

      history.push('/');
    } catch (err) {
      if (err) {
        alert('Houve um error no cadastramento. por favor tente novamente');
      }
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos de sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="E-mail"
            value={inputData.email}
            onChange={(e) =>
              setInputData({ ...inputData, email: e.target.value })
            }
          />
          <input
            placeholder="Whatsapp"
            value={inputData.whatsapp}
            onChange={(e) =>
              setInputData({ ...inputData, whatsapp: e.target.value })
            }
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={inputData.city}
              onChange={(e) =>
                setInputData({ ...inputData, city: e.target.value })
              }
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={inputData.uf}
              onChange={(e) =>
                setInputData({ ...inputData, uf: e.target.value })
              }
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
