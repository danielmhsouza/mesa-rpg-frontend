import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { route, frontRoute } from "../../assets/route";
import List from "../../components/List/List";
import axios from "axios";
import Loading from "../../components/Loading";

const Campanha = () => {
    return (
        <>
            <Header backto="/taverna" name="Campanha" arrow={true}/>
        </>
    )
}

export default Campanha;