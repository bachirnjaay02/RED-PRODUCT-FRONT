import React, { useState } from 'react';
import axios from 'axios';

// Configuration de l'URL de base de l'API
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://https://postgres-production-117b.up.railway.app//api').replace(/\/$/, '');

const AddHotelModal = ({ isOpen, onClose, onRefresh }) => {
  const [hotelData, setHotelData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'F XOF',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Gestion des changements de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  // Gestion du fichier image
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Utilisation de FormData pour envoyer l'image et le texte ensemble
    const data = new FormData();
    data.append('name', hotelData.name);
    data.append('address', hotelData.address);
    data.append('email', hotelData.email);
    data.append('phone', hotelData.phone);
    data.append('price', hotelData.price);
    data.append('currency', hotelData.currency);

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      await axios.post(`${API_BASE_URL}/hotels`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Hôtel ajouté avec succès !');
      onRefresh(); // Actualise la liste
      onClose();   // Ferme le modal
    } catch (error) {
      console.error("Erreur:", error.response?.data);
      alert(error.response?.data?.message || "Erreur de connexion au serveur Laravel.");
    } finally {
      setLoading(false);
    }
  };

  // Si le modal n'est pas ouvert, on n'affiche rien
  if (!isOpen) return null;

  return (
    <>
      {/* Fond sombre derrière le modal */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onClose} 
      ></div>

      {/* Structure du Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg p-3">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold text-uppercase">
                <span className="me-2">←</span> Créer un nouveau hôtel
              </h5>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Nom de l'hôtel</label>
                    <input type="text" name="name" className="form-control bg-light" placeholder="Ex: Terrou-Bi" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Adresse</label>
                    <input type="text" name="address" className="form-control bg-light" placeholder="Ex: Dakar, Plateau" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">E-mail</label>
                    <input type="email" name="email" className="form-control bg-light" placeholder="hotel@gmail.com" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Numéro de téléphone</label>
                    <input type="text" name="phone" className="form-control bg-light" placeholder="+221..." onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Prix par nuit</label>
                    <input type="number" name="price" className="form-control bg-light" placeholder="0" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Devise</label>
                    <select name="currency" className="form-select bg-light" onChange={handleChange}>
                      <option value="F XOF">F XOF</option>
                      <option value="Euro">Euro</option>
                      <option value="Dollar">Dollar</option>
                    </select>
                  </div>
                  <div className="col-12 mt-4">
                    <label className="form-label fw-bold">Ajouter une photo</label>
                    <div className="border rounded p-4 text-center bg-light">
                      <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" required />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>Annuler</button>
                  <button type="submit" className="btn btn-dark px-4" disabled={loading}>
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotelModal;