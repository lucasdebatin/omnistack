import React, { useEffect, useState } from 'react';
import './styles.css'
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incident, setIncident] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncident(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){

       try{ 
           await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
           });

           setIncident(incident.filter(incident => incident.id !== id));
       } catch(err){
           alert('Erro ao deletar caso');
       }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="logo"></img>
                <span>Bem Vindo, {ongName} </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{ incident.title }</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button size={20} type="button" color="#a8a8b3" onClick={ () => handleDeleteIncident(incident.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}