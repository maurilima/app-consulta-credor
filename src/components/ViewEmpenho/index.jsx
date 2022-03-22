import React, { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";


export const ViewEmpenho = ({empenhoNumero}) =>{
    const [empenhos, setEmpenho] = useState([]);


    const showData = async (lRaw) => {
        const response = await GetApiEndPoint(lRaw, URL_DC);
        const data =  await response.content;
        console.log(data);
        setEmpenho(data);
        
        
    }

    useEffect(() => { 
        showData(empenhoNumero)

    },[])

    return (
        <>
        <Row className="empenho">


        </Row>
        
        </>


    )








}