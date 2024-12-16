import React, { useState } from "react";
import "./optionsscroll.scss";
import Item from "./Item";
import Modal from "../../../components/Modal/Modal";

const OptionsScroll = ({ master, characters, missions, items }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

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
    const showAttributes = () =>
        openModal(
            "Atributos",
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
                    <p><strong>Dinheiro:</strong> {char.money}</p>
                    <p><strong>Força:</strong> {char.force}</p>
                    <p><strong>Destreza:</strong> {char.dest}</p>
                    <p><strong>Constituição:</strong> {char.consti}</p>
                    <p><strong>Inteligência:</strong> {char.intel}</p>
                    <p><strong>Sabedoria:</strong> {char.wisdom}</p>
                    <p><strong>Carisma:</strong> {char.charisma}</p>
                    <p><strong>Armadura:</strong> {char.armor}</p>
                    <p><strong>Iniciativa:</strong> {char.initi}</p>
                    <p><strong>Deslocamento:</strong> {char.desloc}</p>
                    <p><strong>HP:</strong> {char.hp}</p>
                    <p><strong>Mana:</strong> {char.mana}</p>
                    <p><strong>Bônus de Proficiência:</strong> {char.b_proef}</p>
                    <p><strong>Inspiração:</strong> {char.inspiration}</p>
                </div>
            ))
        );

    // Função para exibir missões
    const showMissions = () =>
        openModal(
            "Missões",
            <ul>
                {missions.map((mission, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <strong>{mission.name}:</strong> {mission.description}
                    </li>
                ))}
            </ul>
        );

    // Função para exibir itens
    const showItems = () => {
        if (master) {
            // Mestre vê os itens em lista detalhada
            openModal(
                "Itens",
                <ul>
                    {items.map((item, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <strong>{item.name}:</strong> {item.description}
                        </li>
                    ))}
                </ul>
            );
        } else {
            // Jogador vê os itens como lista simples
            openModal(
                "Inventário",
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            );
        }
    };

    const itemsPlayer = [
        { name: "Jogadores", icon: "handshake", fn: () => openModal("Jogadores", "Conteúdo de jogadores") },
        { name: "Atributos", icon: "account_tree", fn: showAttributes },
        { name: "Inventário", icon: "personal_bag", fn: showItems },
        { name: "Missões", icon: "receipt_long", fn: showMissions },
    ];

    const itemsMaster = [
        { name: "Jogadores", icon: "handshake", fn: () => openModal("Jogadores", "Conteúdo de jogadores") },
        { name: "Itens", icon: "personal_bag", fn: showItems },
        { name: "Missões", icon: "receipt_long", fn: showMissions },
    ];

    return (
        <>
            {/* Modal */}
            <Modal show={showModal} onClose={closeModal} title={modalTitle}>
                <div className="modal-dynamic-content">{modalContent}</div>
            </Modal>

            {/* Lista de opções */}
            <div className="scroll">
                <Item itens={master ? itemsMaster : itemsPlayer} />
            </div>
        </>
    );
};

export default OptionsScroll;
