import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PetList from '../Lists/PetList';
import AddPetForm from '../Forms/AddPetForm';
import PetDetails from '../Lists/PetDetails';
import EditPetForm from '../Forms/EditPetForm';
import './App.css';

const App = () => {
    return (
        <div className="app-container">
            <main>
                <Routes>
                    <Route path="/" element={<PetList />} />
                    <Route path="/pets/new" element={<AddPetForm />} />
                    <Route path="/pets/:id" element={<PetDetails />} />
                    <Route path="/pets/:id/edit" element={<EditPetForm />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
