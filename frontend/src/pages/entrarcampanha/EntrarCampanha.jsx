import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import axios from "axios";
import Loading from "../../components/Loading";
import './entrarcampanha.scss';

const EntrarCampanha = () => {
    return (
        <>
            <Header backto="/taverna" name="Entrar Campanha" arrow={true} />

            <div className="main">
                <div className="main_search">
                    <input type="text" placeholder="Buscar Campanha" className="main_search_input input-general" />
                    <button className="button-orange main_search_button-search">
                        <span class="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </div>

                <div className="main_show-card">
                    <div className="main_show-card_title">
                        <h2><b>Título:</b> Título da Campanha</h2>
                        <h4><b>Criador:</b> Criador da campanha</h4>
                    </div>

                    <div className="main_show-card_body">

                        <div className="main_show-card_body_img">
                            <img src="https://source.unsplash.com/random/800x600" alt="teste" />
                        </div>

                        <div className="main_show-card_body_desc">
                            <h4><b>Descriçäo:</b></h4>
                            <p>
                                Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type.
                            </p>
                            <h4><b>Frequëncia:</b> Semanal</h4>
                        </div>

                    </div>

                    <div className="main_show-card_footer">
                        <button className="button-orange" onClick={() => window.location.href = '/criarpersonagem'}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EntrarCampanha;