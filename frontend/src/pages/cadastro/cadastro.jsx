import React, { useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import axios from "axios";
import "./cadastro.scss";
import Loading from "../../components/Loading";

const Cadastro = () => {
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    async function cadastrar(name, email, pass, confPass) {
        setLoad(true);

        if (pass != confPass) {
            setError(true);
            setLoad(false);
            return
        }
        setError(false);

        try {
            let url = `${route}/cadastro`;

            const response = await axios.post(url,
                {
                    name: name,
                    email: email,
                    password: pass,
                    conf_pass: confPass
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            if (response.statusCode == 200) {
                setError2(false);
                window.location.href = `${frontRoute}/home`
            } else {
                console.log(response.msg);
                setError2(true);
            }
        } catch (error) {
            console.log(error);
        }

        setLoad(false);
    }

    return (
        <>
            <Loading run={load} />
            <Header backto={'/home'} name={'Cadastro'} arrow={true}/>

            <main className="main-cadastro">
                <div className="form">
                    <div className="form_inputs">
                        <input type="text" className="input-general" id="name" placeholder="Seu Nome" />
                        <input type="email" className="input-general" id="email" placeholder="Seu Email" />
                        <input type="password" className="input-general" id="pass" placeholder="Senha" />
                        <input type="password" className="input-general" id="confpass" placeholder="Confirme a Senha" />
                    </div>
                    <button className="button-orange" onClick={
                        () => {
                            let name = document.getElementById('name').value;
                            let email = document.getElementById('email').value;
                            let pass = document.getElementById('pass').value;
                            let confPass = document.getElementById('confpass').value;
                            cadastrar(name, email, pass, confPass);
                        }
                    }>
                        Cadastrar
                    </button>

                    { error2 ? <p>Email já cadastrado.</p> : null }
                    { error ? <p>Senhas Diferentes.</p> : null }
                </div>
            </main>
        </>
    )
}

export default Cadastro;