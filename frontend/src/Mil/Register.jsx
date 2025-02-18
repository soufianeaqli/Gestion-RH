import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig'; // Importer la configuration Axios

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'Inscription échouée.');
      }
    } catch (error) {
      setErrorMessage('Une erreur s’est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2 className="mb-4 text-center">Créer un compte</h2>
        <form onSubmit={handleRegister}>
          <div className="form-floating">
            <label>Nom</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Entrez votre nom" 
              required 
            />
          </div>
          <div className="form-floating">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Entrez votre email" 
              required 
            />
          </div>
          <div className="form-floating password-container">
            <label>Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Entrez votre mot de passe" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">S'enregistrer</button>
        </form>
        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
        <p className="mt-3 text-center">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
