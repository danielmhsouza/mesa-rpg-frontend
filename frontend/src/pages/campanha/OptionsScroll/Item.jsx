import React, { useEffect, useState } from "react";

const Item = (props) => {
    return (
        <>
            {
                props.itens.map((it) =>

                    <div className="scroll_item" onClick={() => it.fn()}>
                        <div className="scroll_item_circle">
                            <span class="material-symbols-outlined">
                                {it.icon}
                            </span>
                        </div>
                        <p>{it.name}</p>
                    </div>
                )
            }
        </>
    )
}

export default Item;