import React from "react";

const Options = (props) => {
    
    return (
        <>
            {props.items.sort().map((value) =>
                <option>
                    {value}
                </option>
            )}

        </>
    )
}

export default Options;