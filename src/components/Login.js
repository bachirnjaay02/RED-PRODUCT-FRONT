import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);
      onLoginSuccess?.(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#494949',
        backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    >
      <div className="w-100 mx-3" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4 text-white d-flex align-items-center justify-content-center">
          <i className="bi bi-shield-shaded fs-3 me-2"></i>
          <h4 className="m-0 fw-bold">RED PRODUCT</h4>
        </div>

        <div className="card border-0 shadow-lg rounded-3 p-4">
          <div className="card-body">
            <p className="mb-4 text-dark">Connectez-vous en tant que Admin</p>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control border-0 border-bottom rounded-0 px-0"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control border-0 border-bottom rounded-0 px-0"
                  placeholder="Mot de passe"
                  required
                />
              </div>
              <div className="form-check mb-4 mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label className="form-check-label small" htmlFor="remember">Gardez-moi connecté</label>
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 py-2 fw-bold"
                style={{ backgroundColor: '#494949' }}
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-warning text-decoration-none small d-block mb-2">
            Mot de passe oublié ?
          </Link>
          <p className="text-white small mb-2">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-warning text-decoration-none fw-bold">
              S'inscrire
            </Link>
          </p>
          <Link to="/dashboard" className="text-warning text-decoration-none small">
            Continuer sans compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;