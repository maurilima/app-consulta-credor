import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { columnsEmpenho, paginationOptions } from "../PaginationTable/options";
import { ProgressCircle } from "../../utils/Progress";
import { clearData } from "../../Config/Util/libUtil";

import "./index.css";

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
      {/* <Row className="empenho">
        <Col>
          <Card>
            <Card.Header>
              <p>Nº Empenho</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.numeroEmpenho}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>N° Processo S.E.I</Card.Header>
            <Card.Body>
              <Card.Title>
                {cabecalho.linkDeAcesso === "#" ? (
                  <p>
                    <span>
                      <h6>{cabecalho.numeroProcessoSei}</h6>
                    </span>
                  </p>
                ) : (
                  <a href={cabecalho.linkDeAcesso} target="_blank">
                    {cabecalho.numeroProcessoSei}
                  </a>
                )}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <p>Contrato</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.numeroContratoFormatado}</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <p>Data</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.dataEmpenho}</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <p>Valor</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.valorEmpenho}</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <p>Fonte</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> 001 </Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <p>Liquidado</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.totalLiquidado}</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <p>Estornado</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.totalEstornado}</Card.Title>
            </Card.Body>
          </Card>
        </Col>


        <Col>
          <Card>
            <Card.Header>
              <p>Pago</p>
            </Card.Header>
            <Card.Body>
              <Card.Title> {cabecalho.totalPago}</Card.Title>
            </Card.Body>
          </Card>
        </Col>



      </Row> */}
      <Row>
        <Col xs="auto">
          <p>Nº Empenho:</p>
          <span>
            {cabecalho.numeroEmpenho}
          </span>
        </Col>
        <Col xs="auto">
          <p>N° Processo S.E.I</p>
          {cabecalho.linkDeAcesso === "#" ? 
             <span>{cabecalho.numeroProcessoSei}</span>
                     : 
            <a href={cabecalho.linkDeAcesso} target="_blank">
              <span>{cabecalho.numeroProcessoSei}</span>
            </a>
          }
        </Col>
        <Col xs="auto">
          <p>Contrato</p>
          {cabecalho.numeroContratoFormatado !== ""
            ? <span>"00000000"</span>
            : <span>cabecalho.numeroContratoFormatado </span>}
        </Col>
        <Col className="valores" xs="auto">
          <p>Fonte</p>
          <span>{cabecalho.fonteRecurso}</span>
        </Col>

        <Col className="valores" xs="auto">
          <p>Data</p>
          <span>{cabecalho.dataEmpenho}</span>
        </Col>
        <Col className="valores" xs="auto">
          <p>Valor</p>
          <span>{cabecalho.valorEmpenho}</span>
        </Col>

        <Col className="valores" xs="auto">
          <p>Liquidado</p>
          <span>{cabecalho.totalLiquidado}</span>
        </Col>
        <Col className="valores" xs="auto">
          <p>Estornado</p>
          <span>{cabecalho.totalEstornado}</span>
        </Col>
        <Col className="valores" xs="auto">
          <p>Pago</p>
          <span>{cabecalho.totalPago}</span>
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
