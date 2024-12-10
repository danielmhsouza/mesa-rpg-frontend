import React from "react";
import "./modal.scss";

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">{title}</div>
                <div className="modal-close-button" onClick={onClose}>
                    X
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
