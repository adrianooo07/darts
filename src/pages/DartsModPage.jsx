import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDart, updateDart } from '../api/dartsApi';

export const DartsModPage = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [worldChWon, setWorldChWon] = useState('0');
    const [profileUrl, setProfileUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getDart(dartsId);
                const dart = response.data;
                setName(dart.name || '');
                setBirthDate(dart.birth_date ? dart.birth_date.substring(0, 10) : '');
                setWorldChWon(String(dart.world_ch_won ?? 0));
                setProfileUrl(dart.profile_url || '');
                setImageUrl(dart.image_url || '');
            } catch (error) {
                console.log(error);
                setError('Nem sikerült betölteni a dartsost.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [dartsId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const modifiedDart = {
            name: name,
            birth_date: birthDate,
            world_ch_won: Number(worldChWon),
            profile_url: profileUrl,
            image_url: imageUrl
        };

        try {
            await updateDart(dartsId, modifiedDart);
            alert('Sikeres módosítás!');
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Nem sikerült módosítani a dartsost. Ellenőrizd az adatokat.');
        }
    };

    if (loading) return <div className="container py-5">Betöltés...</div>;

    return (
        <main className="container py-4">
            <h1 className="mb-4">Dartsos módosítása</h1>
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
                <button type="submit" className="btn btn-warning me-2">Módosítás</button>
                <Link to="/" className="btn btn-secondary">Mégse</Link>
            </form>
        </main>
    );
};
