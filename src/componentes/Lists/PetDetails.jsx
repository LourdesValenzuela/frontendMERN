import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Detail.css';


const PetDetails = () => {
    const { id } = useParams(); // Obtiene el ID de la mascota desde los parámetros de la URL
    const [pet, setPet] = useState(null); // Estado para almacenar los detalles de la mascota
    const [liked, setLiked] = useState(false); // Estado para controlar si la mascota ha sido "liked"
    const [likes, setLikes] = useState(0); // Estado para el número de likes de la mascota
    const navigate = useNavigate(); // Hook para redireccionar a otras rutas

    useEffect(() => {
        // Función para obtener los detalles de la mascota desde el servidor
        const fetchPet = async () => {
            try {
                const response = await axios.get(`https://backendmern-tb3e.onrender.com/mascotas/${id}`);
                setPet(response.data); // Almacena los detalles de la mascota en el estado
                setLikes(response.data.likes || 0); // Inicializa el número de likes
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPet(); // Llama a la función para obtener los detalles de la mascota
    }, [id]); // El efecto se ejecuta cuando el ID cambia

    // Maneja la adopción de la mascota
    const handleAdopt = async (id) => {
        try {
            await axios.delete(`https://backendmern-tb3e.onrender.com/mascotas/${id}`);
            console.log(`Mascota con ID ${id} adoptada con éxito`);
            navigate('/'); // Redirige a la página principal después de la adopción
        } catch (error) {
            console.error('Error adopting pet:', error.response?.data?.message || error.message);
        }
    };

    // Maneja el "like" de la mascota
    const handleLike = async () => {
        if (liked) return; // Si la mascota ya está "liked", no hace nada

        try {
            const response = await axios.post(`https://backendmern-tb3e.onrender.com/mascotas/${id}/like`);
            setLikes(response.data.likes); // Actualiza el número de likes
            setLiked(true); // Desactiva el botón de "like"
            console.log('You liked this pet!');
        } catch (error) {
            console.error('Error liking pet:', error.message);
        }
    };

    return (
        <div className="pet-list-container">
            <div className="list-header">
                <h2>Pet Shelter</h2>
                <Link to="/" className="links">back to home</Link> 
            </div>

            {pet ? (
                <div>
                    <div className="section">
                        <h3>Details about {pet.name}</h3>
                        <button onClick={() => handleAdopt(pet._id)} className="adopt">
                            🏠 Adopt {pet.name}
                        </button>
                    </div>
                    <div className="details-container">
                        <div className="details-row">
                            <label>Pet Type:</label>
                            <p>{pet.type}</p>
                        </div>
                        <div className="details-row">
                            <label>Description:</label>
                            <p>{pet.description}</p>
                        </div>
                        <div className="details-row">
                            <label>Skills:</label>
                            <ul>
                                {pet.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="like-section">
                            <button
                                onClick={handleLike}
                                className="like-button"
                                disabled={liked}
                            >
                                👍{liked ? 'Liked' :  'Like'} {pet.name}
                            </button>
                            <span className="numLikes">{likes} like(s)</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PetDetails;
