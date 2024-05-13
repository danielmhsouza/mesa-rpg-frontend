import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import List from "../../components/List/List";
import axios from "axios";
import Loading from "../../components/Loading";
import Topo from "./Topo/Topo";
import OptionsScroll from "./OptionsScroll/OptionsScroll";
import "./campanha.scss";
import AreaDados from "./AreaDados/AreaDados";


const Campanha = () => {
    const [player, setPlayer] = useState({
        name: "Nome do Player",
        img: "https://source.unsplash.com/random/150x150",
        life: 100,
        mana: 100,
        level: 20
    });
    const [master, setMaster] = useState(false);

    const [dado, setDado] = useState(1);
    const [tipoDado, setTipoDado] = useState(4);

    function girar() {
        setDado(Math.floor(Math.random() * tipoDado) + 1);
    }

    function open() {
        window.alert("abriu");
    }
    function ms() {
        setMaster(!master);
    }

    return (
        <>
            <Header backto="/taverna" name="Campanha" arrow={true} />
            <div className="main">
                <Topo master={master} img={"https://source.unsplash.com/random/150x150"} player={player} />

                <OptionsScroll master={master} />

                <AreaDados dado={dado} setTipoDado={setTipoDado} girar={girar} ms={ms}/>

                {
                    master ?
                        <>
                            <div className="main_add-button" onClick={open}>
                                <span class="material-symbols-outlined">
                                    add
                                </span>
                            </div>
                        </>
                        :
                        null
                }
            </div>
        </>
    )
}

export default Campanha;