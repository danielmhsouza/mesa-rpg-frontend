import React, { useEffect, useState } from "react";
import "./topo.scss";

const Topo = (props) => {

    return (
        <>
            <div className="topo">
                <div className="topo_img-area">
                    {
                        props.master ?
                            <img src={props.img} alt="img" />
                            :
                            <>
                                <img src={props.player.img} alt="img" />
                                <h3>{props.player.name}</h3>
                            </>
                    }
                </div>
                {
                    props.master ?
                        <div className="topo_camp-name">
                            <h3>Nome da Campanha</h3>
                        </div>
                        :
                        <div className="topo_status-area">
                            <div className="topo_status-area_vida">
                                <h3>Vida:</h3> {props.player.life}
                            </div>
                            <div className="topo_status-area_mana">
                                <h3>Mana:</h3> {props.player.mana}
                            </div>
                            <div className="topo_status-area_level">
                                <h3>Level:</h3> {props.player.level}
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default Topo;