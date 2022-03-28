import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { columnsEmpenho, paginationOptions } from "../PaginationTable/options";
import { ProgressCircle } from "../../utils/Progress";
import { clearData } from "../../Config/Util/libUtil";

let numEmpenho = "";
let cabecalho = {};

export const ViewEmpenho = ({ lRow }) => {
  const [empenho, setEmpenho] = useState([]);
  const [loading, setLoading] = useState(false);
  
  numEmpenho = lRow;

  const showData = async (raw) => {
    setLoading(true);
    raw = { numeroEmpenho: raw };
    raw = { ...raw, page: 0, size: 200 };
    const response = await GetApiEndPoint(raw, URL_DC);
    setEmpenho(response.content[0].despesaPorCredorExecucao);
    const cabe = await clearData(response.content);
    cabecalho = await cabe[0];

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
          <p>Nº Empenho:</p>
          <h6>{cabecalho.numeroEmpenho}</h6>
        </Col>
        <Col>
          <p>N° Processo S.E.I</p>
          {cabecalho.numeroProcessoSei}
        </Col>
        <Col>
          <p>Nº Contrato</p>
          {cabecalho.numeroContratoFormatado}
        </Col>
        <Col>
          <p>D. Empenho</p>
          {cabecalho.dataEmpenho}
        </Col>
        <Col>
          <p>Valor Empenho</p>
          {cabecalho.valorEmpenho}
        </Col>
        <Col>
          <p>Valor Liquidado</p>
          {cabecalho.totalLiquidado}
        </Col>
        <Col>
          <p>Valor Estornado</p>
          {cabecalho.totalEstornado}
        </Col>
        <Col>
          <p>Valor Pago</p>
          {cabecalho.totalPago}
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
