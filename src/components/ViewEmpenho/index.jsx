import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { columnsEmpenho, paginationOptions } from "../PaginationTable/options";

let numEmpenho = "";

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
export const ViewEmpenho = ({ lRow }) => {
  const [empenho, setEmpenho] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(lRow);
  numEmpenho = lRow;

  const showData = async (raw) => {
    // console.log(raw);
    setLoading(true);
    raw = { numeroEmpenho: raw };
    raw = { ...raw, page: 0, size: 200 };
    console.log(raw);
    const response = await GetApiEndPoint(raw, URL_DC);
    // console.log(response.con);
    setEmpenho(response.content[0].despesaPorCredorExecucao);
    setLoading(false);
  };

  useEffect(() => {
    // console.log(numEmpenho);

    showData(numEmpenho);
  }, []);

  //   console.log(empenho)

  //   if (lRow == null ) {
  //     console.log("sim");

  //     console.log(numEMpenho);
  //   } else {
  //     numEMpenho = lRow;
  //     console.log("Nao");
  //     console.log(lRow);
  //   }

  //   //   if (Object.values(lRow).length > 0) {
  //   if (numEMpenho !== null) {
  //     //   numEMpenho = lRow;
  //     console.log(numEMpenho);

  //     // const retorno = showData(numEMpenho);
  //     numEMpenho = "";
  //     console.log(numEMpenho);
  //   }
  //   //   }

  return (
    <>
      <Row className="empenho"></Row>
      <div className="tabela">
            <DataTable
              title="Pagamentos"
              columns={columnsEmpenho}
              data={empenho}
              striped
              true
              progressPending={loading}
              pagination
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
};
