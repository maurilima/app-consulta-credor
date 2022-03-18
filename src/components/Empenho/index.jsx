// import './index.css'

import { Col, Row } from "react-bootstrap";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";

// import { Co
let lRaw = {};
let lNumero = null;

// async 
function Empenho(lRow ) {
  let response = null;


  // // console.log(lRow)

  if (lRow.lenght !== 0  ) {
    lNumero = lRow;
    // console.log(lRow)
    lRaw = { numeroEmpenho: lNumero };
    console.log(lRaw);

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
    <div id="renderEmpenho">
      {/* <ContainerStyled> */}
      <h1>Nova</h1>
      <Row>
        <Col>
          Nº Empenho :
         </Col>
      </Row>

    </div>
  );
}

export default Empenho;
