export const paginationOptions = {
  rowsPerPageText: "Linhas por Página",
  rangeSeparatorText: "de",
  selectAllRowsItemText: "Todos",
  selectAllRowsItem: true,
  paginationRowsPerPageOptions: [20, 25, 30],
};

export const customStyle = {
  content: {
    top: "5%",
    left: "5px",
    right: "5px",
    bottom: "5px",
    marginTop: "10px",
  },
};



export const columnsEmpenho = [
  {
    name: "Nº Documento(NOB)",
    selector: row => `${row.numeroDocumento}`,
    sortable: true,
    wrap: true,
    grow: 1.1,
  },

  {
    name: "Data ",
    selector: row => `${row.data}`,
    sortable: true,
    wrap: true,
    grow: 0.3,
  },
  {
    name: "Valor R$",
    selector: row => `${row.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`,
    sortable: true,
    right: true,
    grow: 1.2,
  },

  {
    name: "Ocorrência",
    selector: (row) => `${row.ocorrencia}`,
    sortable: true,
    wrap: true,
    grow: 2,
  },

  {
    name: "Histórico",
    selector: (row) => `${row.historico}`,
    sortable: true,
    wrap: true,
    grow: 4,
  },
];

