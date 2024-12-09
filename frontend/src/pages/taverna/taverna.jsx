import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import "./taverna.scss";
import List from "../../components/List/List";
import axios from "axios";
import Loading from "../../components/Loading";

const Taverna = () => {
    const [user, setUser] = useState({});
    const [load, setLoad] = useState(false);
    const [myCamp, setMyCamp] = useState({});
    const [camp, setCamp] = useState({});
    const [options, setOptions] = useState(false);

    useEffect(() => {
        setUser({
            id: sessionStorage.getItem('user_id'),
            name: sessionStorage.getItem('user_name')
        })

        

    }, [])

    function openOptions() {
        options ? setOptions(false) : setOptions(true);
    }

    function exit() {
        sessionStorage.clear();
        window.location.href = `/home`
    }
    let items = [{ name: 'Banana', code: '001', href: "/campanha" }, { name: 'Manga', code: '520', href: "/campanha" }, { name: 'Maçã', code: '302', href: "/campanha" }];
    let items2 = [{ name: 'Banana', code: '001', href: "/campanha" }, { name: 'Manga', code: '520', href: "/campanha" }];
    return (
        <>
            <Loading run={load} />
            <Header backto={'/'} name="Taverna" arrow={false} />
            <div className="boasvindas">
                <h3>Bem vindo(a), {user.name}</h3>
                <button className="button-orange" onClick={() => { exit(); }}>Sair</button>
            </div>
            <main className="main">
                <div className="opcoes">
                    <a href="#">Conta</a>
                    <a href="#">Dúvidas</a>
                </div>
                <div className="campanha">
                    <div className="campanha_campanhas">
                        <h3>Campanhas</h3>
                        <hr />
                        <List items={items} />
                    </div>

                    <div className="campanha_minhas-campanhas">
                        <h3>Minhas Campanhas</h3>
                        <hr />
                        <List items={items2} />
                    </div>
                </div>
                <div className="bottom-button">
                    {
                        options ?
                            <>
                                <div className="bottom-button_item">
                                    Entrar
                                    <a href="/entrarcampanha">
                                        <span className="material-symbols-outlined">
                                            login
                                        </span>
                                    </a>
                                </div>
                                <div className="bottom-button_item">
                                    Criar...
                                    <a href="/criarcampanha">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </a>
                                </div>
                            </>
                            :
                            null
                    }
                    <div className="bottom-button_button" onClick={openOptions}>+</div>
                </div>
            </main>
        </>

    )
}

export default Taverna;