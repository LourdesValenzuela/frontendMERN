import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

const PetList = () => {
    const [pets, setPets] = useState([]); // Estado para almacenar la lista de mascotas

    useEffect(() => {
        // Función para obtener la lista de mascotas desde el servidor
        const fetchPets = async () => {
            try {
                const response = await axios.get('https://backendmern-tb3e.onrender.com/mascotas');
                setPets(response.data); // Almacena la lista de mascotas en el estado
            } catch (error) {
                console.error('Error fetching pets:', error); // Maneja errores si ocurren
            }
        };

        fetchPets(); // Llama a la función para obtener la lista de mascotas
    }, []); // El efecto se ejecuta solo una vez cuando el componente se monta

    return (
        <div className="pet-list-container">
            <div className="list-header">
                <h2>Pet Shelter</h2>
                <Link to="/pets/new" className="links">add a pet to the shelter</Link>
            </div>
            <p>These pets are looking for a good home</p>
            <table className="pet-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map(pet => (
                        <tr key={pet._id}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to={`/pets/${pet._id}`} className="links">details</Link> | 
                                <Link to={`/pets/${pet._id}/edit`} className="links"> edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetList;
