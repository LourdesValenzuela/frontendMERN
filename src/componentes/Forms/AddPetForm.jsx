import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import './Form.css'; 

const AddPetForm = () => {
    // Define el estado para los campos del formulario y los posibles errores
    const [name, setName] = useState(''); // Estado para el nombre de la mascota
    const [type, setType] = useState(''); // Estado para el tipo de la mascota
    const [description, setDescription] = useState(''); // Estado para la descripción de la mascota
    const [skills, setSkills] = useState(['', '', '']); // Estado para las habilidades de la mascota
    const [error, setError] = useState(''); // Estado para los mensajes de error
    const navigate = useNavigate(); // Hook para redireccionar a otra ruta

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
        try {
            // Envía una solicitud POST para agregar una nueva mascota
            await axios.post('https://backendmern-tb3e.onrender.com/mascotas', {
                name,
                type,
                description,
                skills
            });
            // Redirige a la página principal después de un envío exitoso
            navigate('/');
        } catch (error) {
            // Maneja los errores durante la solicitud
            if (error.response && error.response.status === 400) {
                console.log('Error: A pet with this name already exists');
                setError('A pet with this name already exists.'); // Mensaje de error específico
            } else {
                console.log('Error adding pet:', error.message);
                setError('Error adding pet. Please try again.'); // Mensaje de error general
            }
        }
    };

    // Maneja el cambio en los campos de habilidades
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills]; // Crea una copia del array de habilidades
        updatedSkills[index] = value; // Actualiza el valor de la habilidad en el índice correspondiente
        setSkills(updatedSkills); // Actualiza el estado con el array modificado
    };

    return (
        <div className="add-pet-form-container"> 
            <div className="add-pet-form"> 
                <div className="list-header"> 
                    <h2>Pet Shelter</h2> 
                    <Link to="/" className="backHome">back to home</Link> 
                </div>
                <p>Know a pet needing a home?</p> 
                <form onSubmit={handleSubmit} className="form-bordered"> 
                    <div className="form-group1"> 
                        <div className="form-group1">
                            <label>Pet Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group1">
                            <label>Pet Type:</label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group1">
                            <label>Pet Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-actions"> 
                            <button type="submit" className="add">
                                <span className="icon">🐾</span> Add Pet
                            </button>
                        </div>
                    </div>
                    <div className="form-group2 options"> 
                        <p><span className="subtitle">Skills (optional):</span></p>
                        <div className="form-group2">
                            <label>Skill 1:</label>
                            <input
                                type="text"
                                value={skills[0]}
                                onChange={(e) => handleSkillChange(0, e.target.value)}
                            />
                        </div>
                        <div className="form-group2">
                            <label>Skill 2:</label>
                            <input
                                type="text"
                                value={skills[1]}
                                onChange={(e) => handleSkillChange(1, e.target.value)}
                            />
                        </div>
                        <div className="form-group2">
                            <label>Skill 3:</label>
                            <input
                                type="text"
                                value={skills[2]}
                                onChange={(e) => handleSkillChange(2, e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>} 
            </div>
        </div>
    );
};

export default AddPetForm; // Exporta el componente para su uso en otros archivos
