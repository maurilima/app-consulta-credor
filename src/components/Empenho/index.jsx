// import './index.css'
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { clearData, clearDataTable } from "../../Config/Util/libUtil";
import { ProgressCircle } from "../../utils/Progress";
import { columnsEmpenho, paginationOptions } from "../PaginationTable/options";

// import { Co

let lNumero = null;
let lRaw = "{}";
let cabecalho = null;
let data =[];
let totalRows =0;

const Empenho  = async (lRow) => {
  console.log(lRow)
  console.log(lNumero)
  
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [totalRows, setTotalRows] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);

  if (lNumero === null ) {
    console.log(lNumero)
  if (Object.values(lRow).length > 0) {
  } else {
    lNumero = lRow;
    lRaw = { numeroEmpenho: lNumero };
    lRaw = { ...lRaw, page: 0, size: 200 };
    const response = await GetApiEndPoint(lRaw, URL_DC);
    console.log(response.content)
    data = clearDataTable( response.content[0].despesaPorCredorExecucao);

    // fetchEmpenho(lRaw);
  }
}
  // async function fetchEmpenho(raw) {
    // let response = null;

    // // setLoading(true);

    // lRaw = { ...lRaw, page: 0, size: 200 };
    // // try {
      // response = await GetApiEndPoint(lRaw, URL_DC);
      
      
      // setData( clearDataTable( response.content[0].despesaPorCredorExecucao));
    
    
      // setData(dados);
     
      // cabecalho = clearData(response.content);
      // console.log(data)
      // console.log(cabecalho);

      // totalRows = response.totalElements;
      // setLoading(false);
      // console.log(response.data)
    // } catch {
    //   alert("Ocorreu um erro ao tentar Carregar dados");
    // }
  // }
  // useEffect(() => {
  //   /* eslint-disable */

  //   fetchEmpenho(lRaw);
  // }, []);
  // // if (page > 0) {
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
        </div>
          <div className="tabela">
            <DataTable
              title="Pagamentos"
              columns={columnsEmpenho}
              data={data}
              // striped
              // true
              // progressPending={loading}
              // pagination
              // paginationServer
              // paginationTotalRows={totalRows}
              // paginationDefaultPage={currentPage}
              // onChangeRowsPerPage={handlePerRowsChange}
              // onChangePage={handlePageChange}
              paginationComponentOptions={paginationOptions}
              // progressComponent={<ProgressCircle />}
            />
          </div>
    </>
  );
}

export default Empenho;
