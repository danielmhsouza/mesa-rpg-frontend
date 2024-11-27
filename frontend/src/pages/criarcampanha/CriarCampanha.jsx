import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import axios from "axios";
import Loading from "../../components/Loading";
import Options from "../../components/Options/Options";
import "./criarcampanha.scss";

const CriarCampanha = () => {
    const [linkimg, setLinkimg] = useState("");
    const freq = ["Diariamente", "Semanalmente", "Mensalmente", "Anualmente"];

    return (
        <>
            <Header backto="/taverna" name="Criar Campanha" arrow={true} />
            <div className="main">
                <div className="main_inputs">

                    <input type="text" className="input-general" placeholder="Nome da Campanha" />
                    <textarea cols="30" rows="10" className="input-textarea" placeholder="Descriçao"></textarea>
                    <div className="main_inputs_div">
                        <label>Frequencia:</label>
                        <select className="input-select">
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
                        <button className="button-grey" onClick={()=>window.location.href="/taverna"}>Cancelar</button>
                        <button className="button-orange"onClick={()=>window.location.href="/taverna"}>Criar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CriarCampanha;