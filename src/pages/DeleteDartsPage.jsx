import { useNavigate, useParams } from 'react-router-dom';
import { deleteDart } from '../api/dartsApi';

export const DeleteDartsPage = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteDart(dartsId);
            alert('Sikeres törlés!');
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('Nem sikerült törölni a dartsost.');
        }
    };

    return (
        <main className="container py-5 text-center">
            <h1 className="h3 mb-3">Biztosan törölni szeretnéd ezt a dartsost?</h1>
            <button className="btn btn-danger me-2" onClick={handleDelete}>Igen, törlés</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Mégse</button>
        </main>
    );
};
