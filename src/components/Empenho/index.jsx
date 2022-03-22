// import './index.css'
import React from "react";
import { Col, Row } from "react-bootstrap";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { clearData } from "../../Config/Util/libUtil";

// import { Co

let lNumero = null;
let lRaw = "{}";
let cabecalho = null;

function Empenho(lRow) {

  if (Object.values(lRow).length > 0) {
  } else {
    lNumero = lRow;
    lRaw = { numeroEmpenho: lNumero };
    fetchEmpenho(lRaw);
  }
  async function fetchEmpenho(raw) {
    let response = null;
    lRaw = { ...lRaw, page: 0, size: 200 };
    try {
      response = await GetApiEndPoint(lRaw, URL_DC);
      
      console.log(response.content[0].despesaPorCredorExecucao);
      cabecalho = clearData(response.content)
      
      // setTotalRows(response.totalElements);
      // setLoading(false);
      // console.log(response.data)
    } catch {
      alert("Ocorreu um erro ao tentar Carregar dados");
    }
  }

  // if (page > 0) {
  //   lPage = page - 1;
  // }

  // lRaw = { ...lRaw, page: lPage, size: perPage };

  // try {
  //   response = await GetApiEndPoint(lRaw, URL_DC);

  //   // setData(clearData(response.content));
  //   // setTotalRows(response.totalElements);
  //   // setLoading(false);
  // } catch {
  //   alert("Ocorreu um erro ao tentar Carregar dados");
  // }

  //  console.log(response)

  return (
    <>
      <div id="renderEmpenho">
        {/* <ContainerStyled> */}
        <Row>
          <Col>
            <h5>
              Empenho :<span>{lNumero}</span>
            </h5>
          </Col>
        </Row>
        <Row></Row>
      </div>
    </>
  );
}

export default Empenho;
