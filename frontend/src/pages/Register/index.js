import React, {useState} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();
    
    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"></img>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro.</p>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}></input>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}></input>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}></input>
                        <input placeholder="UF" style={{ width:80 }} value={uf} onChange={e => setUf(e.target.value)}></input>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}