import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route } from "../../assets/route";
import Loading from "../../components/Loading";
import Topo from "./Topo/Topo";
import OptionsScroll from "./OptionsScroll/OptionsScroll";
import "./campanha.scss";
import AreaDados from "./AreaDados/AreaDados";
import { useParams } from "react-router-dom";
import axios from "axios";

const Campanha = () => {
    const [player, setPlayer] = useState({
        name: "",
        img: "",
        life: 0,
        mana: 0,
        level: 0,
    });

    const [master, setMaster] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [missions, setMissions] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(false);

    const [dado, setDado] = useState(1);
    const [tipoDado, setTipoDado] = useState(4);

    const { campId, isMaster } = useParams();

    useEffect(() => {
        setMaster(isMaster == 1 ? true : false);

        const fetchData = async () => {
            const user_id = sessionStorage.getItem("user_id");

            try {
                const charResponse = await axios.get(`${route}/personagem?campaign_id=${campId}&user_id=${user_id}`);
                setCharacters(charResponse.data.characters || []);

                if (charResponse.data.characters && charResponse.data.characters.length > 0) {
                    const char = charResponse.data.characters[0];
                    setPlayer({
                        name: char.name,
                        img: char.img_link,
                        life: char.hp,
                        mana: char.mana,
                        level: char.level,
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [campId, isMaster]);

    function girar() {
        setDado(Math.floor(Math.random() * tipoDado) + 1);
    }

    const openOptions = () => setOptions(!options);

    return (
        <>
            <Header backto="/taverna" name="Campanha" arrow={true} />
            <div className="main">
                <Topo master={master} img={player.img} player={player} />

                {loading ? (
                    <Loading run={loading} />
                ) : (
                    <OptionsScroll
                        master={master}
                        characters={characters}
                        missions={missions}
                        items={items}
                    />
                )}

                <AreaDados dado={dado} setTipoDado={setTipoDado} girar={girar} />

                {master && (
                    <div className="bottom-button">
                        {options && (
                            <>
                                <div className="bottom-button_item">
                                    <span className="material-symbols-outlined">add_circle</span>
                                    <a href="/criaritem">Criar Item</a>
                                </div>
                                <div className="bottom-button_item">
                                    <span className="material-symbols-outlined">assignment</span>
                                    <a href="/criarmissao">Criar Missão</a>
                                </div>
                            </>
                        )}
                        <div className="main_add-button" onClick={openOptions}>
                            <span className="material-symbols-outlined">add</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Campanha;
