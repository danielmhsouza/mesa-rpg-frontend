import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import axios from "axios";
import Loading from "../../components/Loading";
import './entrarcampanha.scss';

const EntrarCampanha = () => {

    const [loading, setLoading] = useState(false);
    const [camp, setCamp] = useState(null);
    const [id, setId] = useState(null);

    async function getCamapaing(id) {
        setLoading(true);
        if (!id) {
            return;
        }
        try {
            const response = await axios.get(`${route}/campanha?id=${id}`);
            if (response.status == 200) {
                setCamp(response.data);
            }

            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
        setLoading(false);
    }

    return (
        <>
            <Loading run={loading} />
            <Header backto="/taverna" name="Entrar Campanha" arrow={true} />

            <div className="main">
                <div className="main_search">
                    <input type="number" placeholder="Buscar Campanha" className="main_search_input input-general" onChange={(e) => { setId(e.target.value) }} />
                    <button className="button-orange main_search_button-search" onClick={() => { getCamapaing(id); }}>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </div>

                {camp != null ?
                    <div className="main_show-card">
                        <div className="main_show-card_title">
                            <h2><b>Título:</b> {camp.name} </h2>
                            <h4><b>Criador:</b> {camp.user_name} </h4>
                        </div>

                        <div className="main_show-card_body">

                            <div className="main_show-card_body_img">
                                {
                                    camp.img_link ?
                                        <img src={camp.img_link} alt={camp.came} />
                                        :
                                        <img src="https://source.unsplash.com/random/800x600" alt="sem imagem" />
                                }
                            </div>

                            <div className="main_show-card_body_desc">
                                <h4><b>Descriçäo:</b></h4>
                                <p>
                                    {camp.description}
                                </p>
                                <h4><b>Frequëncia:</b> {camp.freq}</h4>
                            </div>

                        </div>

                        <div className="main_show-card_footer">
                            <button className="button-orange" onClick={() => window.location.href = `/criarpersonagem/${camp.campaign_id}`}>
                                Entrar
                            </button>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}

export default EntrarCampanha;