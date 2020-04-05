import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    // Init Vars
    const history = useHistory();
    const ongId   = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);

    // Load Incidents 
    useEffect(() => {
        async function loadIncidents() {
            const response = await api.get('profile', {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(response.data);
        }
        
        loadIncidents(); 
    }, [ongId]);

    // Delete Incident
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            
            // Remove in DOM
            setIncidents(incidents.filter(incident => incident.id !== id));
            
        } catch (error) {
            alert('Unable to delete, please try again.')
        }
    }

    // Logout
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be A Hero"/>
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new" >Register new incident</Link>
                <button onClick={handleLogout} type="button"><FiPower size={18} color="#E02041" /></button>
            </header>

            <h1>Registered Incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}