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

    useEffect(() => {
        const fetchDataUser = async () =>{

            if (sessionStorage.getItem("id") < 1) {
                window.location.href = `${frontRoute}/home`
            }
            else {
                setLoad(true);
                try {
                    let url = `${route}/user/${sessionStorage.getItem("id")}`;
                    const response = await axios.get(url);
                    setUser(response.data);
                } catch (e) {
                    console.log(e);
                }
                setLoad(false);
            }
        }
        fetchDataUser();
      

    }, [])



    function exit() {
        sessionStorage.removeItem("id");
        window.location.href = `${frontRoute}/home`
    }
    let items = [{ name: 'Banana', code: '001' }, { name: 'Manga', code: '520' }, { name: 'Maçã', code: '302' }]
    return (
        <>
            <Loading run={load} />
            <Header backto={'/'} name="Taverna" />
            <div className="boasvindas">
                <h3>Bem vindo(a), {user.name}</h3>
                <button className="button-orange" onClick={() => { exit(); }}>Sair</button>
            </div>
            <main className="main">
                <div className="opcoes">
                    <a href="#">Criar Campanha</a> /
                    <a href="#">Criar Personagem</a>
                </div>
                <div className="campanhas">
                    <h3>Campanhas</h3>
                    <hr />
                    <List items={items} />
                </div>
            </main>
        </>

    )
}

export default Taverna;