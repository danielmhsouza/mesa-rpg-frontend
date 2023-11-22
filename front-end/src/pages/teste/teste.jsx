import React, { useState } from "react";
import '../../assets/style.scss';

import Header from "../../components/Header";

export default function Teste() {
    const [modal, setModal] = useState(false);
    return (
        <>
            <Header backto={'/'} name={'Teste'} />
            <main className="main">
                <div>
                    <p>Botões</p>
                    <button className="button-orange" onClick={()=>{setModal(true);}}>Salvar</button>
                    <button className="button-grey">Salvar</button>
                </div>
                <div>
                    <p>fechar</p>
                    <button className="button-close">X</button>

                </div>
                <div>
                    <p>inputs</p>
                    <input type="text" className="input-general" placeholder="Teste" />
                    <select name="" id="" className="input-select">
                        <option value="">Nada</option>
                        <option value="">Tudo</option>
                        <option value="">Piranha</option>
                    </select>
                    <textarea name="" id="" cols="30" rows="10" className="input-textarea"></textarea>
                    <input type="file" className="input-file" />
                </div>
                {
                    modal ?
                    <div className="modal">

                        <div className="modal_container">
                            <div className="modal_container_header">
                                <h3>Modal</h3>
                                <button className="button-close" onClick={()=>{setModal(false);}}>X</button>
                            </div>
                            
                            <div className="modal_container_body">
                                <input type="text" className="input-general" placeholder="Nome"/>
                                <input type="number" className="input-general" placeholder="Idade"/>
                                <input type="text" className="input-general" placeholder="Conta Corrente"/>
                                <textarea name="" id="" cols="30" rows="10" className="input-textarea"></textarea>
                            </div>

                            <div className="modal_container_footer">
                                <button className="button-orange">Salvar</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </main>
        </>
    )
}