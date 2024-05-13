import React, { useEffect, useState } from "react";

const AreaDados = (props) => {
    return (
        <>
            <div className="main_dados-area">
                <div className="main_dados-area_dado">
                    <h4>Dado</h4>
                    <h2>{props.dado}</h2>
                </div>
            </div>

            <div className="main_dados-area_inputs">
                <select className="input-select" onChange={(e) => props.setTipoDado(e.target.value)}>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                    <option>10</option>
                    <option>12</option>
                    <option>20</option>
                </select>
                <button className="button-orange" onClick={props.girar}>Girar</button>
                <button className="button" onClick={props.ms}>Ver como mestre</button>
            </div>
        </>
    )
}

export default AreaDados;