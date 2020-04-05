import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    // Init State Vars
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }; 

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile');

        } catch (error) {
            alert('Error in incident registration, please try again.');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Hero" />

                    <h1>Register new incident</h1>
                    <p>In detail, describe the incident to find a hero that could help you resolving your case.</p>

                    <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#E02041" />Back to Profile</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Incident Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Value in $us." value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}