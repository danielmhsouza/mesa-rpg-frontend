import React, { useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Options from "../../components/Options/Options";
import Status from "./Status";
import { useParams } from "react-router-dom";
import './criarpersonagem.scss';
import axios from "axios";
import { route } from "../../assets/route";

const CriarPersonagem = () => {
    const [imglnk, setImgLink] = useState('');
    const [races] = useState(['Anao', 'Elfo', 'Draconato', 'Humano', 'Tiefling', 'Orc']);
    const [classes] = useState(['Mago', 'Lutador', 'Ladino', 'Clérigo', 'Bardo', 'Ranger']);
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [loading, setLoading] = useState(false);
    const [attributes, setAttributes] = useState({
        "Força": 10,
        "Destreza": 10,
        "Constituição": 10,
        "Inteligência": 10,
        "Sabedoria": 10,
        "Carisma": 10
    });
    const [stats, setStats] = useState({
        "Armadura": 10,
        "Iniciativa": 0,
        "Deslocamento": 30,
        "Pontos de Vida": 10,
        "Bonus Proef.": 2,
        "Inspiração": 0,
    });
    const [rolled, setRolled] = useState(false); // Controle do botão

    const { campId } = useParams();

    // Função para rolar atributos com limite de 8 a 18
    const rollAttributes = () => {
        // Rolagem tradicional de 3d6
        const rollDice = () => Math.floor(Math.random() * 6) + 1; // Dado de 6 lados
        const generateStat = () => rollDice() + rollDice() + rollDice(); // Soma de 3 dados
    
        const newAttributes = {
            "Força": generateStat(),
            "Destreza": generateStat(),
            "Constituição": generateStat(),
            "Inteligência": generateStat(),
            "Sabedoria": generateStat(),
            "Carisma": generateStat(),
        };
    
        const baseDeslocamento = getDeslocamento(selectedRace, selectedClass);
    
        setAttributes(newAttributes);
        setStats({
            "Armadura": 10 + Math.floor((newAttributes.Destreza - 10) / 2),
            "Iniciativa": Math.abs(Math.floor((newAttributes.Destreza - 10) / 2)),
            "Deslocamento": baseDeslocamento,
            "Pontos de Vida": 10 + Math.floor((newAttributes.Constituição - 10) / 2),
            "Bonus Proef.": 2,
            "Inspiração": 0,
        });
    
        setRolled(true); // Desabilita o botão após clique
    };

    // Função para calcular deslocamento baseado em raça e classe
    const getDeslocamento = (race, classe) => {
        const raceDeslocamento = {
            "Anao": 25,
            "Elfo": 35,
            "Orc": 30,
            "Humano": 30, // Padrão
        };
    
        const classModifier = {
            "Ladino": 5,   // Bônus para ladinos
            "Lutador": -5, // Penalidade para lutadores
        };
    
        const baseDeslocamento = raceDeslocamento[race] || 30;
    
        const modifier = classModifier[classe] || 0;
    
        return baseDeslocamento + modifier;
    };
    
    async function createCharacter() {
        setLoading(true);
        try{
            const data = {
                name: characterName,
                race: selectedRace,
                classe: selectedClass,
                img_link: imglnk,
                force: attributes["Força"],
                carisma: attributes["Carisma"],
                destreza: attributes["Destreza"],
                constituicaio: attributes["Constituição"],
                inteligencia: attributes["Inteligência"],
                sabedoria: attributes["Sabedoria"],
                armadura: stats["Armadura"],
                iniciativa: stats["Iniciativa"],
                deslocamento: stats["Deslocamento"],
                pontos_vida: stats["Pontos de Vida"],
                bonus_proef: stats["Bonus Proef."],
                inspiracao: stats["Inspiração"],
                camp_id: campId,
                user_id: sessionStorage.getItem('user_id')
            }
            console.log(data)
            const response = await axios.post(`${route}/criar-personagem`, data,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: false
            });
            if(response.data.message){
                setLoading(false);
                window.alert(response.data.message);
                window.location.href = '/taverna';
            }
            window.alert(response.data.error);
        }catch(e){
            console.log(e);
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <>
            <Loading run={loading} />
            <Header backto="/entrarcampanha" name="Criar Personagem" arrow={true} />

            <div className="main">
                <div className="main_body">
                    <div className="main_body_inputs">
                        <div className="main_body_inputs_left-side">
                            <input type="text" className="input-general" placeholder="Nome do Personagem"
                            onChange={(e)=>{setCharacterName(e.target.value)}} />
                            <input
                                type="text"
                                className="input-general"
                                placeholder="Link da Imagem"
                                onChange={(e) => setImgLink(e.target.value)}
                            />

                            <label>Raça:</label>
                            <select
                                className="input-select"
                                onChange={(e) => setSelectedRace(e.target.value)}
                                value={selectedRace}
                            >
                                <Options items={races} />
                            </select>

                            <label>Classe:</label>
                            <select
                                className="input-select"
                                onChange={(e) => setSelectedClass(e.target.value)}
                                value={selectedClass}
                            >
                                <Options items={classes} />
                            </select>
                        </div>

                        <div className="main_body_inputs_right-side">
                            <div className="main_body_inputs_right-side_img">
                                <img src={imglnk} alt="Personagem" />
                            </div>
                            <button
                                className="button-grey"
                                onClick={rollAttributes}
                                disabled={rolled}
                                style={rolled ? {cursor: 'default', backgroundColor: '#3f3f3f'} : {}}
                            >
                                {rolled ? "Dados Rolados" : "Rodar Dados"}
                            </button>
                        </div>
                    </div>

                    <div className="main_body_status">
                        <div className="main_body_status_side">
                            <Status status={attributes} />
                        </div>

                        <div className="main_body_status_side">
                            <Status status={stats} />
                        </div>
                    </div>

                    <div className="main_body_button">
                        <button
                            className="button-orange"
                            onClick={() => {createCharacter()}}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CriarPersonagem;
