import React, { useEffect, useState } from "react";
import "./optionsscroll.scss";
import Item from "./Item";

const OptionsScroll = (props) => {

    function openModal() {
        window.alert("abriu");
    }

    const items = [
        {
            name: "Jogadores",
            icon: "handshake",
            fn: openModal
        },
        {
            name: "Habilidades",
            icon: "star",
            fn: openModal
        },
        {
            name: "Atributos",
            icon: "account_tree",
            fn: openModal
        },
        {
            name: "Iventário",
            icon: "personal_bag",
            fn: openModal
        },
        {
            name: "Missoes",
            icon: "receipt_long",
            fn: openModal
        },
    ];

    const itemsm = [
        {
            name: "Jogadores",
            icon: "handshake",
            fn: openModal
        },
        {
            name: "Inimigos",
            icon: "star",
            fn: openModal
        },
        {
            name: "Atributos",
            icon: "account_tree",
            fn: openModal
        },
        {
            name: "Itens",
            icon: "personal_bag",
            fn: openModal
        },
        {
            name: "Missoes",
            icon: "receipt_long",
            fn: openModal
        },
    ];

    return (
        <>
            <div className="scroll">
                {
                    props.master ?
                        <Item itens={itemsm} />
                        :
                        <Item itens={items} />
                }
            </div>
        </>
    )
}

export default OptionsScroll;