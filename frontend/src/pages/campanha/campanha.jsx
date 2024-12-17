import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route } from "../../assets/route";
import Loading from "../../components/Loading";
import Topo from "./Topo/Topo";
import OptionsScroll from "./OptionsScroll/OptionsScroll";
import "./campanha.scss";
import AreaDados from "./AreaDados/AreaDados";
import Modal from "../../components/Modal/Modal"; // Importa o modal
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

    const [campData, setCampData] = useState({});

    const [master, setMaster] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [missions, setMissions] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [artifactName, setArtifactName] = useState();
    const [artifactDesc, setArtifactDesc] = useState();

    const [dado, setDado] = useState(1);
    const [tipoDado, setTipoDado] = useState(4);

    const { campId, isMaster } = useParams();

    useEffect(() => {
        setMaster(isMaster == 1 ? true : false);

        const fetchData = async () => {
            const user_id = sessionStorage.getItem("user_id");

            try {
                if (isMaster) {
                    const charResponse = await axios.get(`${route}/personagem?campaign_id=${campId}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: false
                        });

                    const campData = await axios.get(`${route}/campanha?id=${campId}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: false
                        });

                    setCampData(campData.data);
                    setCharacters(charResponse.data.characters || []);

                } else {


                    const charResponse = await axios.get(`${route}/personagem?campaign_id=${campId}&user_id=${user_id}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: false
                        });

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
                }

                // Buscar artefatos (itens e missões)
                fetchArtifacts();
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [campId, isMaster]);

    // Função para buscar artefatos
    const fetchArtifacts = async () => {
        try {
            const response = await axios.get(`${route}/artefato?campaign_id=${campId}`);
            const artifacts = response.data.artifacts || [];

            setItems(artifacts.filter((artifact) => artifact.category === 0));
            setMissions(artifacts.filter((artifact) => artifact.category === 1));
        } catch (error) {
            console.error("Erro ao buscar artefatos:", error.response?.data || error.message);
        }
    };

    // Girar dado
    function girar() {
        setDado(Math.floor(Math.random() * tipoDado) + 1);
    }

    const openOptions = () => setOptions(!options);

    // Abre o modal e reseta os campos do formulário
    const openModal = (title) => {
        setModalTitle(title);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleSave = async () => {
        const category = modalTitle === "Criar Item" ? 0 : 1; // Define a categoria dinamicamente
    
        const payload = {
            name: artifactName,
            description: artifactDesc,
            category: category,
            campaign_id: campId,
        };

        try {
            const response = await axios.post(`${route}/artefato`, payload,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: false
            });
            console.log("Resposta do servidor:", response.data);
    
            closeModal(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao salvar:", error.response?.data || error.message);
        }
    };

    
    

    return (
        <>
            <Header backto="/taverna" name="Campanha" arrow={true} />
            <div className="main">

                <Topo master={master} campData={ campData } player={player} />

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
                                <div
                                    className="bottom-button_item"
                                    onClick={() => openModal("Criar Item")}
                                >
                                    <span className="material-symbols-outlined">add_circle</span>
                                    <a href="#">Criar Item</a>
                                </div>
                                <div
                                    className="bottom-button_item"
                                    onClick={() => openModal("Criar Missão")}
                                >
                                    <span className="material-symbols-outlined">assignment</span>
                                    <a href="#">Criar Missão</a>
                                </div>
                            </>
                        )}
                        <div className="main_add-button" onClick={openOptions}>
                            <span className="material-symbols-outlined">add</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal show={showModal} onClose={closeModal} title={modalTitle}>
                <div className="modal-form">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={ (e) => {setArtifactName(e.target.value); console.log(e.target.value)} }
                        placeholder="Digite o nome"
                    />

                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        onChange={ (e) => {setArtifactDesc(e.target.value); console.log(e.target.value)} }
                        placeholder="Digite a descrição"
                        rows="4"
                    ></textarea>

                    <button className="button-orange" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Campanha;
