import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./styles.css";
import { customStyle, paginationOptions } from "./options";
import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_DC } from "../../Config/urlApi";
import { clearData } from "../../Config/Util/libUtil";
import { ProgressCircle } from "../../utils/Progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@material-ui/core";
import Modal from "react-modal/lib/components/Modal";
import { Button, Col, Row } from "react-bootstrap";
import { ViewEmpenho } from "../ViewEmpenho";

let lPage = 0;
let lRaw = {};

const PaginationTable = ({ aData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [valueRow, setRow] = useState("");

  // const customStyle = {
  //   content: {
  //     top: "12%",
  //     left: "5rem",
  //     right: "5rem",
  //     bottom: "1rem",
  //     marginTop: "1rem",
  //   },
  // };

  function handleCloseModal() {
    setIsOpen(false);
  }

  // useEffect(
  //   (row) => {
  //     console.log(row)
  //     setRow(row);
  //   }, 
  //   // [Row]
  //   [Row]
  // );

  const fetchDiarias = async (page, size = perPage) => {
    let response = null;

    setLoading(true);

    lRaw = JSON.parse(aData);

    if (page > 0) {
      lPage = page - 1;
    }

    lRaw = { ...lRaw, page: lPage, size: perPage };

    if (Object.values(aData).length > 2) {
      try {
        response = await GetApiEndPoint(lRaw, URL_DC);

        setData(clearData(response.content));
        setTotalRows(response.totalElements);
        setLoading(false);
      } catch {
        alert("Ocorreu um erro ao tentar Carregar dados");
      }
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
    // console.log(row)
    setRow(row)
    // console.log(valueRow)
    handleOpenModal();
    
    // ViewEmpenho (row.numeroEmpenho);
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => {
      setRow(row.numeroEmpenho);
      // console.log(row.numeroEmpenho);
      onClick(row)};

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
      cell: (row) => <ActionComponent row={row.numeroEmpenho} onClick={handleDetail} />,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <>
      <Container>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyle}
        >
          <Row className="buttons">
            <Col>
              <Button className="buttonClose" onClick={handleCloseModal}>
                <center>X</center>
              </Button>
            </Col>
          </Row>
          <Row>
            <ViewEmpenho lRow={valueRow} />
         
          </Row>
        </Modal>
      </Container>
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
          // onRowClicked={handleDetail} 

          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationComponentOptions={paginationOptions}
          progressComponent={<ProgressCircle />}
        />
      </div>
    </>
  );
};

export default PaginationTable;
