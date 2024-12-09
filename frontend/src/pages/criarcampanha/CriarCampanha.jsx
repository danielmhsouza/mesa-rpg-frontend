import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import axios from "axios";
import Loading from "../../components/Loading";
import Options from "../../components/Options/Options";
import "./criarcampanha.scss";

const CriarCampanha = () => {
    const [linkimg, setLinkimg] = useState("");
    const [campName, setCampName] = useState("");
    const [campDesc, setCampDesc] = useState("");
    const [campFreq, setCampFreq] = useState("");

    const freq = ["Diariamente", "Semanalmente", "Mensalmente", "Anualmente"];

    async function createCampaign() {
        try {
            const data = {
                name: campName,
                desc: campDesc,
                freq: campFreq,
                img_link: linkimg,
                user_id: sessionStorage.getItem('user_id')
            }
            const response = await axios.post(`${route}/criar-campanha`, data);
            console.log(response.data);
            console.log(response.status);
            if(response.status == 200){
                window.location.href = "/taverna";
            }
        }catch(e){
            console.log(e);
        }

    }

    return (
        <>
            <Header backto="/taverna" name="Criar Campanha" arrow={true} />
            <div className="main">
                <div className="main_inputs">

                    <input type="text" className="input-general" placeholder="Nome da Campanha"
                        onChange={(e) => { setCampName(e.target.value) }} />
                    <textarea cols="30" rows="10" className="input-textarea" placeholder="Descriçao"
                        onChange={(e) => { setCampDesc(e.target.value) }}></textarea>
                    <div className="main_inputs_div">
                        <label>Frequencia:</label>
                        <select className="input-select" onChange={(e) => { setCampFreq(e.target.value) }}>
                            <Options items={freq} />
                        </select>
                    </div>
                    <div className="main_inputs_div">
                        <input type="text" placeholder="Link da imagem" className="input-general" onChange={
                            (e) => { setLinkimg(e.target.value) }
                        } />
                        <div className="main_inputs_div_img">
                            <img src={linkimg} alt="Teste" />
                        </div>
                    </div>

                    <div className="main_inputs_footer">
                        <button className="button-grey" onClick={() => window.location.href = "/taverna"}>Cancelar</button>
                        <button className="button-orange" onClick={() => createCampaign()}>Criar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CriarCampanha;