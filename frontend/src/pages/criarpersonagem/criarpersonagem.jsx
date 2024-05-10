import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import List from "../../components/List/List";
import axios from "axios";
import Loading from "../../components/Loading";
import Options from "../../components/Options/Options";
import './criarpersonagem.scss';
import Status from "./Status";

const CriarPersonagem = () => {
    const [imglnk, setImgLink] = useState('');
    const [races, setRaces] = useState(['Anao', 'Elfo', 'Draconato']);
    const [classe, setClasse] = useState(['Mago', 'Lutador', 'Ladino'])
    const a = {
        "Força": 10,
        "Destreza": 10,
        "Constituiçäo": 10,
        "Inteligencia": 10,
        "Sabedoria": 10,
        "Carisma": 10
    };

    const b = {
        "Armadura": 10,
        "Iniciativa": 10,
        "Deslocamento": 10,
        "Pontos de Vida": 10,
        "Bonus Proef.": 10,
        "Inspiraçao": 10,
    };
    return (
        <>
            <Header backto="/entrarcampanha" name="Criar Personagem" arrow={true} />

            <div className="main">
                <div className="main_body">
                    <div className="main_body_inputs">

                        <div className="main_body_inputs_left-side">
                            <input type="text" className="input-general" placeholder="Nome do Personagem" />
                            <input type="text" className="input-general" placeholder="Link da Imagem" onChange={(e) => {
                                setImgLink(e.target.value);
                            }} />

                            <label>Raça:</label>
                            <select className="input-select">
                                <Options items={races} />
                            </select>

                            <label>Classe:</label>
                            <select className="input-select">
                                <Options items={classe} />
                            </select>
                        </div>

                        <div className="main_body_inputs_right-side">
                            <div className="main_body_inputs_right-side_img">
                                <img src={imglnk} alt="teste" />
                            </div>
                            <button className="button-grey"> Rodar Dados</button>
                        </div>
                    </div>

                    <div className="main_body_status">

                        <div className="main_body_status_side">
                            <Status status={a} />
                        </div>

                        <div className="main_body_status_side">
                            <Status status={b} />
                        </div>
                    </div>

                    <div className="main_body_button">
                        <button className="button-orange" onClick={()=> window.location.href = '/taverna'}>Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CriarPersonagem;