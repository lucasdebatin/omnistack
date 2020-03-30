import React, { useState } from 'react';
import './styles.css'
import img from '../../assets/heroes.png';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

//<img src={img} alt="img"></img>

export default function Logon(props){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            console.log(response.data.name);
            console.log(response.data.id);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            //alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/profile');
        } catch(err){
            alert('Erro no login, tente novamente');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input placeholder="Insira sua ID" value={id} onChange={e => setId(e.target.value)}></input>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="./register">Não tenho cadastro</Link>
                </form>
            </section>
            <img src={img} alt="img"></img>
        </div>
    );
}