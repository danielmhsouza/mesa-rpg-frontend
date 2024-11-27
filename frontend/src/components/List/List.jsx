import React from "react";
import "./list.scss";

const List = (props) => {
    return (
        <>
            {props.items.map((value) =>
                <li className="li">
                    <a href={value.href}>
                        {value.name}
                    </a> 
                    Código: {value.code}
                </li>
            )}

        </>
    )
}

export default List;