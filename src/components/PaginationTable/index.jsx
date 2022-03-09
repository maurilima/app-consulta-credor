import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./styles.css";
import { paginationOptions } from "./options";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { clearData } from "../../Config/Util/libUtil";
import { ProgressCircle } from "../../utils/Progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

let lPage = 0;
let lRaw = {};

const PaginationTable = ({ aData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);



  const fetchDiarias = async (page, size = perPage) => {
    try {
      setLoading(true);

      lRaw = JSON.parse(aData);

      if (page > 0) {
        lPage = page - 1;
      }

      lRaw = { ...lRaw, page: lPage, size: perPage };
      // console.log(lRaw, URL_DC)

      const response = await GetApiEndPoint(lRaw, URL_DC);

      setData(clearData(response.content));
      setTotalRows(response.totalElements);
      setLoading(false);
    } catch {
      alert("Ocorreu um erro ao tentar Carregar dados");
    }
  };

  useEffect(() => {
    /* eslint-disable */
    fetchDiarias(0);
  }, [aData]);

  const handlePageChange = (page) => {
    fetchDiarias(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchDiarias(page, newPerPage);
    setPerPage(newPerPage);
  };

  function handleDetail(row) {
    console.log(row);
  }

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);

    return (
      <button className="search" onClick={clickHandler}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </button>
    );
  };

  const columns = [
    {
      name: "CPF/CNPJ",
      selector: (row) => `${row.cpfCnpj}`,
      sortable: true,
      wrap: true,
    },

    {
      name: "Razão Social",
      selector: (row) => `${row.razaoSocial}`,
      sortable: true,
      wrap: true,
    },

    {
      name: "Nº Empenho",
      selector: (row) => `${row.numeroEmpenho}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Data Emp.",
      selector: (row) => `${row.dataEmpenho}`,
      sortable: true,
      wrap: true,
    },

    {
      name: "Exercicio",
      selector: (row) => `${row.exercicio}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "U.O.",
      selector: (row) => `${row.descricaoUnidadeOrcamentaria}`,
      sortable: true,
      wrap: true,
    },

    {
      name: "V. Empenho",
      selector: (row) => `${row.valorEmpenho}`,
      sortable: true,
      right: true,
    },
    {
      name: "Detalhe",
      button: true,
      cell: (row) => <ActionComponent row={row} onClick={handleDetail} />,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div className="tabela">
      <DataTable
        title="Despesas por Credor"
        columns={columns}
        data={data}
        striped
        true
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationComponentOptions={paginationOptions}
        progressComponent={<ProgressCircle />}
      />
    </div>
  );
};

export default PaginationTable;
