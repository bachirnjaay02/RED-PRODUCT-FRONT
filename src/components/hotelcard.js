import React from 'react';

function HotelCard({ hotel }) {
    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                <img
                    src={hotel.image}
                    className="card-img-top"
                    alt={hotel.name}
                    style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body p-3">
                    <p className="text-danger mb-1" style={{ fontSize: '11px' }}>{hotel.location}</p>
                    <h6 className="card-title fw-bold mb-2">{hotel.name}</h6>
                    <p className="card-text text-dark small">{hotel.price} XOF par nuit</p>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;