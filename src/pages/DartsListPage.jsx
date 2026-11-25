import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDarts } from '../api/dartsApi';

export const DartsListPage = () => {
    const [darts, setDarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getDarts();
                setDarts(response.data);
            } catch (error) {
                console.log(error);
                setError('Nem sikerült betölteni a dartsosokat.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <div className="container py-5">Betöltés...</div>;
    if (error) return <div className="container py-5 alert alert-danger">{error}</div>;

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Dartsosok</h1>
                    <p className="text-secondary mb-0">{darts.length} játékos</p>
                </div>
                <Link to="/new-darts" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>Új dartsos
                </Link>
            </div>

            {darts.length === 0 ? (
                <div className="alert alert-info">Nincs megjeleníthető dartsos.</div>
            ) : (
                <div className="row g-4">
                    {darts.map((dart) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={dart.id}>
                            <div className="card dart-card h-100">
                                <img
                                    src={dart.image_url}
                                    className="card-img-top dart-image"
                                    alt={dart.name}
                                    onError={(event) => { event.currentTarget.style.display = 'none'; }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h2 className="h4 card-title">{dart.name}</h2>
                                    <p className="mb-2"><strong>Született:</strong> {dart.birth_date}</p>
                                    <p className="mb-3"><strong>Világbajnoki címek:</strong> {dart.world_ch_won}</p>
                                    <div className="d-flex flex-wrap gap-2 mt-auto">
                                        <Link to={'/darts/' + dart.id} className="btn btn-outline-primary btn-sm">Részletek</Link>
                                        <Link to={'/mod-darts/' + dart.id} className="btn btn-outline-warning btn-sm">Módosítás</Link>
                                        <Link to={'/del-darts/' + dart.id} className="btn btn-outline-danger btn-sm">Törlés</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};
