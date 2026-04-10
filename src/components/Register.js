import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth'; // On importe la fonction ici

const Register = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      // Appel de la fonction définie dans services/auth.js
      const response = await registerUser(formData);
      
      if (onRegisterSuccess) onRegisterSuccess(response.user);
      alert('Inscription réussie !');
      navigate('/'); // Redirige vers la connexion après succès
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#494949' }}>
      <div className="w-100 mx-3" style={{ maxWidth: '440px' }}>
        <div className="text-center mb-4 text-white">
          <h4 className="fw-bold">RED PRODUCT</h4>
        </div>
        <div className="card border-0 shadow-lg p-4">
          <div className="card-body">
            <p className="mb-4 fw-semibold">Inscrivez-vous en tant qu'admin</p>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleRegister}>
              <input type="text" name="name" className="form-control mb-3" placeholder="Nom complet" onChange={handleChange} required />
              <input type="email" name="email" className="form-control mb-3" placeholder="E-mail" onChange={handleChange} required />
              <input type="password" name="password" className="form-control mb-3" placeholder="Mot de passe" onChange={handleChange} required />
              <input type="password" name="password_confirmation" className="form-control mb-3" placeholder="Confirmer" onChange={handleChange} required />
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" name="acceptTerms" onChange={handleChange} required />
                <label className="form-check-label small">J'accepte les conditions</label>
              </div>
              <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                {loading ? 'Création...' : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;