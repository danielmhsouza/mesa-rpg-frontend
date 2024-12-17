import React, { useState } from "react";
import "./optionsscroll.scss";
import Item from "./Item";
import Modal from "../../../components/Modal/Modal";

const OptionsScroll = ({ master, characters, missions = [], items = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [loading, setLoading] = useState(false);

    const openModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    // Função para exibir atributos do personagem
    const showAttributes = () => {
        openModal(
            "Atributos",
            characters.length > 0 ? (
                characters.map((char, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <img
                            src={char.img_link}
                            alt={char.name}
                            style={{ width: "150px", borderRadius: "8px" }}
                        />
                        <p><strong>Nome:</strong> {char.name}</p>
                        <p><strong>Level:</strong> {char.level}</p>
                        <p><strong>Classe:</strong> {char.class}</p>
                        <p><strong>Raça:</strong> {char.race}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum personagem encontrado.</p>
            )
        );
    };

    // Função para exibir missões
    const showMissions = () => {
        setLoading(true);
        setTimeout(() => {
            openModal(
                "Missões",
                missions.length > 0 ? (
                    <ul>
                        {missions.map((mission, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <strong>{mission.name}:</strong> {mission.desc}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma missão encontrada.</p>
                )
            );
            setLoading(false);
        }, 500);
    };

    // Função para exibir itens
    const showItems = () => {
        setLoading(true);
        setTimeout(() => {
            openModal(
                "Itens",
                items.length > 0 ? (
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <strong>{item.name}:</strong> {item.desc}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum item encontrado.</p>
                )
            );
            setLoading(false);
        }, 500);
    };

    // Função para exibir jogadores
    const showPlayers = () => {
        openModal(
            "Jogadores",
            characters.length > 0 ? (
                <ul>
                    {characters.map((item, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <strong>{item.name}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum jogador encontrado.</p>
            )
        );
    };

    const itemsPlayer = [
        { name: "Jogadores", icon: "handshake", fn: showPlayers },
        { name: "Atributos", icon: "account_tree", fn: showAttributes },
        { name: "Inventário", icon: "personal_bag", fn: showItems },
        { name: "Missões", icon: "receipt_long", fn: showMissions },
    ];

    const itemsMaster = [
        { name: "Jogadores", icon: "handshake", fn: showPlayers },
        { name: "Itens", icon: "personal_bag", fn: showItems },
        { name: "Missões", icon: "receipt_long", fn: showMissions },
    ];

    return (
        <>
            {/* Modal */}
            <Modal show={showModal} onClose={closeModal} title={modalTitle}>
                {loading ? <p>Carregando...</p> : <div className="modal-dynamic-content">{modalContent}</div>}
            </Modal>

            {/* Lista de opções */}
            <div className="scroll">
                <Item itens={master ? itemsMaster : itemsPlayer} />
            </div>
        </>
    );
};

export default OptionsScroll;
