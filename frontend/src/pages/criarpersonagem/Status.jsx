const Status = (props) => {
    return (
        <>
            {
                Object.entries(props.status).map(([name, value]) => (

                    <div className="main_body_status_side_st">
                        <p>{name}:</p>
                        <p>{value}</p>
                    </div>

                ))

            }
        </>
    )
}

export default Status;