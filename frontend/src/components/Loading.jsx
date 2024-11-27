import React from "react";
import "./loading.css";

const Loading = (props) => {
    return (
        <>
            {
                props.run ?
                    <div className="spin">

                        <span className="loader"></span>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default Loading;