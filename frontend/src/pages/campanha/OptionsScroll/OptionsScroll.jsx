import React, { useState } from "react";
import "./optionsscroll.scss";
import Item from "./Item";
import Modal from "../../../components/Modal/Modal";
import Accordion from "../../../components/Accordion/Accordion";

const OptionsScroll = (props) => {
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

    // Dados Dinâmicos
    const missions = [
        { name: "Salvar o Reino", description: "Resgate o rei capturado pelos orcs no norte." },
        { name: "Encontrar a Espada Lendária", description: "Busque a espada mágica na floresta encantada." }
    ];

    const items = [
        { name: "Espada Longa", description: "Uma espada de aço forjada por ferreiros mestres." },
        { name: "Poção de Vida", description: "Restaura 50 pontos de vida ao jogador." }
    ];

    const players = [
        { character: "Aragorn", life: 100, mana: 50 },
        { character: "Gandalf", life: 80, mana: 120 }
    ];

    // Estrutura dos Accordion no Modal
    const contentMap = {
        Jogadores: players.map((player, index) => (
            <Accordion
                key={index}
                title={player.character}
                content={
                    <p>
                        <strong>Vida:</strong> {player.life} <br />
                        <strong>Mana:</strong> {player.mana}
                    </p>
                }
            />
        )),
        Itens: items.map((item, index) => (
            <Accordion
                key={index}
                title={item.name}
                content={<p>{item.description}</p>}
            />
        )),
        Missoes: missions.map((mission, index) => (
            <Accordion
                key={index}
                title={mission.name}
                content={<p>{mission.description}</p>}
            />
        )),
    };

    const itemsMaster = [
        { name: "Jogadores", icon: "handshake", fn: () => openModal("Jogadores", contentMap.Jogadores) },
        { name: "Itens", icon: "personal_bag", fn: () => openModal("Itens", contentMap.Itens) },
        { name: "Missoes", icon: "receipt_long", fn: () => openModal("Missoes", contentMap.Missoes) },
    ];

    const itemsPlayer = [
        { name: "Jogadores", icon: "handshake", fn: () => openModal("Jogadores", contentMap.Jogadores) },
        { name: "Itens", icon: "personal_bag", fn: () => openModal("Itens", contentMap.Itens) },
        { name: "Missoes", icon: "receipt_long", fn: () => openModal("Missoes", contentMap.Missoes) },
    ];

    return (
        <>
            {/* Modal */}
            <Modal show={showModal} onClose={closeModal} title={modalTitle}>
                <div className="modal-dynamic-content">{modalContent}</div>
            </Modal>

            {/* Conteúdo principal */}
            <div className="scroll">
                {props.master ? <Item itens={itemsMaster} /> : <Item itens={itemsPlayer} />}
            </div>
        </>
    );
};

export default OptionsScroll;
