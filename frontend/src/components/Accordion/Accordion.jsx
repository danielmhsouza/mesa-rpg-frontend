import React, { useState } from "react";
import "./accordion.scss";

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <span className="accordion-toggle">{isOpen ? "−" : "+"}</span>
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    );
};

export default Accordion;
