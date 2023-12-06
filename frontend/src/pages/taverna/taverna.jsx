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

    useEffect(() => {
        const fetchDataUser = async () => {
            setLoad(true);

            try {
                let url = `${route}user/getuser.php?id=${sessionStorage.getItem('id')}`;
                const response = await axios.get(url);
                console.log(response);
                if (response.data.approved == 0) {
                    window.location = `${frontRoute}/home`;
                }

                setUser(response.data.user);
            } catch (e) {
                console.log(e);
            }
            setLoad(false);
        }
        fetchDataUser();


    }, [])



    function exit() {
        sessionStorage.clear();
        window.location.href = `${frontRoute}/home`
    }
    let items = [{ name: 'Banana', code: '001' }, { name: 'Manga', code: '520' }, { name: 'Maçã', code: '302' }];
    let items2 = [{ name: 'Banana', code: '001' }, { name: 'Manga', code: '520' }];
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
                    <a href="#">Criar Campanha</a>
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
            </main>
        </>

    )
}

export default Taverna;