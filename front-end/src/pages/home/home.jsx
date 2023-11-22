import React from "react";
import '../../assets/style.scss';
import Header from "../../components/Header";
export default function Home() {
    return (
        <>
            <Header backto={'/'} name={'Home'}></Header>

            <main className="main">
                <h2>Bem vindo a plataforma mais maneira para jogar RPG de mesa Online!</h2>
            </main>
        </>
    )
}