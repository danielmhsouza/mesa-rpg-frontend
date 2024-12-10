import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import "./taverna.scss";
import List from "../../components/List/List";
import axios from "axios";
import Loading from "../../components/Loading";

const Taverna = () => {
    const [user, setUser] = useState({});
    const [load, setLoad] = useState(false);
    const [campaigns, setCampaigns] = useState([]); // Todas as campanhas
    const [myCamp, setMyCamp] = useState({});
    const [camp, setCamp] = useState({});
    const [options, setOptions] = useState(false);

    // Busca os dados do usuário e as campanhas ao montar o componente
    useEffect(() => {
        const userId = sessionStorage.getItem("user_id");
        const userName = sessionStorage.getItem("user_name");

        if (userId) {
            setUser({ id: userId, name: userName });
            fetchCampaigns(userId);
        } else {
            console.error("Erro: user_id não encontrado na sessionStorage.");
        }
    }, []);

    // Função para buscar todas as campanhas do usuário
    const fetchCampaigns = async (userId) => {
        setLoad(true);
        try {
            const response = await axios.get(`http://localhost:5001/campanhas-usuario?user_id=${userId}`);
            const data = response.data;

            console.log("Campanhas recebidas:", data);

            setCampaigns(data); // Armazena todas as campanhas

            // Separar campanhas criadas (baseadas no user_id) e campanhas entradas
            const myCampaigns = data.filter(camp => camp.user_id.toString() === userId);
            const enteredCampaigns = data.filter(camp => camp.user_id.toString() !== userId);

            setMyCamp(myCampaigns); // Campanhas criadas pelo usuário
            setCamp(enteredCampaigns); // Campanhas que o usuário participa
        } catch (error) {
            console.error("Erro ao buscar campanhas:", error);
        } finally {
            setLoad(false);
        }
    };

    // Função para abrir/fechar opções do botão "+"
    const openOptions = () => setOptions(!options);

    // Função para sair da conta
    const exit = () => {
        sessionStorage.clear();
        window.location.href = `/home`;
    };

    return (
        <>
            <Loading run={load} />
            <Header backto={"/"} name="Taverna" arrow={false} />
            <div className="boasvindas">
                <h3>Bem vindo(a), {user.name}</h3>
                <button className="button-orange" onClick={exit}>
                    Sair
                </button>
            </div>
            <main className="main">
                <div className="opcoes">
                    <a href="#">Conta</a>
                    <a href="#">Dúvidas</a>
                </div>
                <div className="campanha">
                    {/* Lista de campanhas que o usuário entrou */}
                    <div className="campanha_campanhas">
                        <h3>Campanhas</h3>
                        <hr />
                        {camp.length > 0 ? (
                            <List
                                items={camp.map(c => ({
                                    name: c.name,
                                    code: c.campaign_id,
                                    href: `/campanha/${c.campaign_id}`
                                }))}
                            />
                        ) : (
                            <p>Nenhuma campanha encontrada.</p>
                        )}
                    </div>

                    {/* Lista de campanhas criadas pelo usuário */}
                    <div className="campanha_minhas-campanhas">
                        <h3>Minhas Campanhas</h3>
                        <hr />
                        {myCamp.length > 0 ? (
                            <List
                                items={myCamp.map(c => ({
                                    name: c.name,
                                    code: c.campaign_id,
                                    href: `/campanha`
                                }))}
                            />
                        ) : (
                            <p>Você ainda não criou campanhas.</p>
                        )}
                    </div>
                </div>

                {/* Botão "+" com opções */}
                <div className="bottom-button">
                    {options && (
                        <>
                            <div className="bottom-button_item">
                                Entrar
                                <a href="/entrarcampanha">
                                    <span className="material-symbols-outlined">login</span>
                                </a>
                            </div>
                            <div className="bottom-button_item">
                                Criar...
                                <a href="/criarcampanha">
                                    <span className="material-symbols-outlined">edit</span>
                                </a>
                            </div>
                        </>
                    )}
                    <div className="bottom-button_button" onClick={openOptions}>
                        +
                    </div>
                </div>
            </main>
        </>
    );
};

export default Taverna;