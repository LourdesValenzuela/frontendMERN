import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Edit.css';

const EditPetForm = () => {
    const { id } = useParams(); // Obtiene el ID de la mascota de los parámetros de la URL
    const navigate = useNavigate(); // Hook para redireccionar a otra ruta
    const [pet, setPet] = useState(null); // Estado para almacenar los detalles de la mascota
    const [name, setName] = useState(''); // Estado para el nombre de la mascota
    const [type, setType] = useState(''); // Estado para el tipo de la mascota
    const [description, setDescription] = useState(''); // Estado para la descripción de la mascota
    const [skills, setSkills] = useState(['', '', '']); // Estado para las habilidades de la mascota
    const [errors, setErrors] = useState({}); // Estado para los mensajes de error

    useEffect(() => {
        // Función para obtener los detalles de la mascota desde el servidor
        const fetchPet = async () => {
            try {
                const response = await axios.get(`https://backendmern-tb3e.onrender.com/mascotas/${id}`);
                setPet(response.data); // Almacena los detalles de la mascota en el estado
                setName(response.data.name);
                setType(response.data.type);
                setDescription(response.data.description);
                setSkills(response.data.skills || []);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };
        fetchPet(); // Llama a la función para obtener los detalles de la mascota
    }, [id]); // El efecto se ejecuta cuando el ID cambia

    // Función para validar los campos del formulario
    const validateForm = () => {
        const newErrors = {};
        if (name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters long.';
        if (type.trim().length < 3) newErrors.type = 'Type must be at least 3 characters long.';
        if (description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters long.';
        return newErrors;
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
        const formErrors = validateForm(); // Valida el formulario
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // Si hay errores, actualiza el estado de errores
            return;
        }

        try {
            // Envía una solicitud PUT para actualizar los detalles de la mascota
            await axios.put(`https://backendmern-tb3e.onrender.com/mascotas/${id}`, {
                name,
                type,
                description,
                skills
            });
            // Redirige a la página principal después de una actualización exitosa
            navigate('/');
        } catch (error) {
            console.error('Error updating pet:', error);
            setErrors({ update: 'Error updating pet. Please try again.' }); // Mensaje de error general
        }
    };

    // Maneja el cambio en los campos de habilidades
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills]; // Crea una copia del array de habilidades
        updatedSkills[index] = value; // Actualiza el valor de la habilidad en el índice correspondiente
        setSkills(updatedSkills); // Actualiza el estado con el array modificado
    };

    if (!pet) return <p>Loading...</p>; // Muestra un mensaje de carga mientras se obtienen los detalles de la mascota

    return (
        <div className="edit-form-container">
            <div className="edit-form">
                <div className="header">
                    <h2>Pet Shelter</h2>
                    <Link to="/" className="home-link">Back to Home</Link>
                </div>
                <p>Edit details for a pet</p>
                <form onSubmit={handleSubmit} className="form-content">
                    <div className="form-layout">
                        <div className="form-section">
                            <div className="form-field">
                                <label>Pet Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errors.name && <p className="error-text">{errors.name}</p>}
                            </div>
                            <div className="form-field">
                                <label>Pet Type:</label>
                                <input
                                    type="text"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                                {errors.type && <p className="error-text">{errors.type}</p>}
                            </div>
                            <div className="form-field">
                                <label>Pet Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                {errors.description && <p className="error-text">{errors.description}</p>}
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    <span className="icon">✏️</span> Edit Pet
                                </button>
                            </div>
                        </div>
                        <div className="form-section">
                            <div className="skills-section">
                                <p><span className="subtitle">Skills (optional):</span></p>
                                <div className="form-field">
                                    <label>Skill 1:</label>
                                    <input
                                        type="text"
                                        value={skills[0]}
                                        onChange={(e) => handleSkillChange(0, e.target.value)}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Skill 2:</label>
                                    <input
                                        type="text"
                                        value={skills[1]}
                                        onChange={(e) => handleSkillChange(1, e.target.value)}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Skill 3:</label>
                                    <input
                                        type="text"
                                        value={skills[2]}
                                        onChange={(e) => handleSkillChange(2, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {errors.update && <p className="error-text">{errors.update}</p>}
                </form>
            </div>
        </div>
    );
};

export default EditPetForm;

