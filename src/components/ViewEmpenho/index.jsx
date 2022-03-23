import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { columnsEmpenho, paginationOptions } from "../PaginationTable/options";
import { ProgressCircle } from "../../utils/Progress";
import { clearData } from "../../Config/Util/libUtil";

let numEmpenho = "";

export const ViewEmpenho = ({ lRow }) => {
  let cabecalho = {}  ;
  const [empenho, setEmpenho] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [cabecalho,setCabecalho] = useState({})

  numEmpenho = lRow;

  const showData = async (raw) => {
    console.log(raw);
    setLoading(true);
    raw = { numeroEmpenho: raw };
    raw = { ...raw, page: 0, size: 200 };
    const response = await GetApiEndPoint(raw, URL_DC);
    setEmpenho(response.content[0].despesaPorCredorExecucao);
    cabecalho = clearData(response.content);
    console.log(cabecalho)

    console.log(cabecalho.numeroEmpenho)
    setLoading(false);
  };

  useEffect(() => {
       /* eslint-disable */
    showData(numEmpenho);
  }, []);



  return (
    <>
      <Row className="empenho">
          <Col>
              <h5>Nº Empenho:</h5>
              <h4>{cabecalho.numeroEmpenho}</h4>
          </Col>
      </Row>
      <div className="tabela">
            <DataTable
              title="Pagamentos"
              columns={columnsEmpenho}
              data={empenho}
              striped
              true
              progressPending={loading}
              pagination
              paginationComponentOptions={paginationOptions}
              progressComponent={<ProgressCircle />}
            />
          </div>
    </>
  );
};
