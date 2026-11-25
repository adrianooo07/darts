import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDart } from '../api/dartsApi';

export const DartsSinglePage = () => {
    const { dartsId } = useParams();
    const [dart, setDart] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getDart(dartsId);
                setDart(response.data);
            } catch (error) {
                console.log(error);
                setError('A dartsos nem található.');
            }
        };
        getData();
    }, [dartsId]);

    if (error) return <div className="container py-5 alert alert-danger">{error}</div>;
    if (!dart) return <div className="container py-5">Betöltés...</div>;

    return (
        <main className="container py-4">
            <div className="card dart-detail mx-auto">
                <img src={dart.image_url} className="card-img-top dart-detail-image" alt={dart.name}
                    onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                <div className="card-body">
                    <h1>{dart.name}</h1>
                    <p><strong>Azonosító:</strong> {dart.id}</p>
                    <p><strong>Születési dátum:</strong> {dart.birth_date}</p>
                    <p><strong>Világbajnoki címek:</strong> {dart.world_ch_won}</p>
                    {dart.profile_url && <p><a href={dart.profile_url} target="_blank" rel="noreferrer">Játékos profilja</a></p>}
                    <Link to="/" className="btn btn-secondary">Vissza a listához</Link>
                </div>
            </div>
        </main>
    );
};
