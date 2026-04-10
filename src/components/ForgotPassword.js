import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    navigate('/');
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
      <div className="w-100 mx-3" style={{ maxWidth: '420px' }}>
        <div className="text-center mb-4 text-white d-flex align-items-center justify-content-center">
          <i className="bi bi-shield-shaded fs-3 me-2"></i>
          <h4 className="m-0 fw-bold">RED PRODUCT</h4>
        </div>

        <div className="card border-0 shadow-lg rounded-3 p-4">
          <div className="card-body">
            <p className="mb-3 text-dark fw-semibold">Réinitialiser votre mot de passe</p>
            <p className="text-muted small mb-4">
              Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
            </p>

            <form onSubmit={handleReset}>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control border-0 border-bottom rounded-0 px-0"
                  placeholder="E-mail"
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 fw-bold" style={{ backgroundColor: '#494949' }}>
                Envoyer le lien
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link to="/" className="text-warning text-decoration-none small">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
