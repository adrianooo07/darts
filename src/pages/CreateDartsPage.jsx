import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDart } from '../api/dartsApi';

export const CreateDartsPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [worldChWon, setWorldChWon] = useState('0');
    const [profileUrl, setProfileUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDart = {
            name: name,
            birth_date: birthDate,
            world_ch_won: Number(worldChWon),
            profile_url: profileUrl,
            image_url: imageUrl
        };

        try {
            await createDart(newDart);
            alert('Sikeres hozzáadás!');
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Nem sikerült létrehozni a dartsost. Ellenőrizd a megadott adatokat.');
        }
    };

    return (
        <main className="container py-4">
            <h1 className="mb-4">Új dartsos hozzáadása</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="dart-form">
                <div className="mb-3">
                    <label className="form-label">Név</label>
                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Születési dátum</label>
                    <input type="date" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Világbajnoki címek</label>
                    <input type="number" min="0" className="form-control" value={worldChWon} onChange={(e) => setWorldChWon(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Profil URL</label>
                    <input type="url" className="form-control" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kép URL</label>
                    <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success me-2">Hozzáadás</button>
                <Link to="/" className="btn btn-secondary">Mégse</Link>
            </form>
        </main>
    );
};
