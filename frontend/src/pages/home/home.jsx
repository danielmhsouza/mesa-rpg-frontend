import React, { useState } from "react";
import logo from "../../assets/logo.png";
import './home.scss';
import { frontRoute, route } from "../../assets/route";
import axios from "axios";
import Loading from "../../components/Loading";

export default function Home() {
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    async function login(email, pass) {
        setLoad(true);
        try {
            let url = `${route}/login`;
            
            const response = await axios.post(url, {email: email, password: pass}, 
                {headers:{'Content-Type': 'application/json'}});
            if (response.data.user_id) {
                setError(false);
                setError2(false);
                sessionStorage.setItem('user_id', response.data.user_id);
                sessionStorage.setItem('user_name', response.data.user_name);
                sessionStorage.setItem('email', response.data.email);
                window.location.href = `/taverna`

            } else {
                setError(true);
                setError2(false);
            }
        } catch (error) {
            setError2(true);
            console.log(error);
        }

        setLoad(false);
    }

    return (
        <>
            <Loading run={load} />
            <div className="img-back">
                <div className="img-back_pelicula">
                    <div className="img-back_pelicula_left-side">
                        <img src={logo} alt="" />
                        <h2>A plataforma mais maneira de RPG de mesa Online!</h2>
                        <p>A maioria das ferramentas que você precisa para jogar com seus amigos. <a href="/comofunciona" style={{ color: "orange" }}>Como funciona?</a></p>
                        <div>
                            <button className="button-orange img-back_pelicula_left-side_button-home" onClick={() => { window.location.href = `/cadastro` }}>Cadastre-se</button>
                        </div>
                    </div>

                    <div className="img-back_pelicula_right-side">
                        {
                            sessionStorage.getItem('user_id') ?
                                <div className="img-back_pelicula_right-side_entrar"><a href={`/taverna`}>Entrar ►</a></div>
                                :
                                null
                        }
                        <div className="img-back_pelicula_right-side_container-login">
                            <h3>Login</h3>
                            <div className="img-back_pelicula_right-side_container-login_inputs">
                                <input type="email" id="email" placeholder="Email" className="input-general" />
                                <input type="password" id="pass" placeholder="Senha" className="input-general" />
                            </div>
                            <button className="button-orange" onClick={
                                () => {
                                    let email = document.getElementById('email').value;
                                    let pass = document.getElementById('pass').value;
                                    login(email, pass);
                                }
                            }>Login</button>
                            {error ? <p>Login ou Senha inválido.</p> : null}
                            {error2 ? <p>Erro ao conectar.</p> : null}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}