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

    const [master, setMaster] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [missions, setMissions] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formData, setFormData] = useState({ name: "", description: "" });

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

    // Abre o modal e reseta os campos do formulário
    const openModal = (title) => {
        setModalTitle(title);
        setFormData({ name: "", description: "" });
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const category = modalTitle === "Criar Item" ? 0 : 1; // Define a categoria dinamicamente
    
        const payload = {
            name: formData.name,
            description: formData.description,
            category: category,
            campaign_id: campId, // Id da campanha (já disponível via useParams)
        };
    
        try {
            const response = await axios.post(`${route}/artefato`, payload);
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
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite o nome"
                    />

                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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