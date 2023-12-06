import React from "react";

const Header = (props) => {
    return (
        <>
            <header className="header">
                <a href={props.backto} className="header_backbutton">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </a>
                <h1>{props.name}</h1>
            </header>
        </>
    )
}

export default Header;