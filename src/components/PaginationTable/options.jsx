export const paginationOptions = {
  rowsPerPageText: "Linhas por Página",
  rangeSeparatorText: "de",
  selectAllRowsItemText: "Todos",
  selectAllRowsItem: true,
  paginationRowsPerPageOptions: [20, 25, 30],
};


export const columnsEmpenho = [
  {
    name: "Nº Documento",
    selector: row => `${row.numeroDocumento}`,
    sortable: true,
    wrap: true,
  },

  {
    name: "Data ",
    selector: row => `${row.data}`,
    sortable: true,
    wrap: true,
  },
  {
    name: "Valor R$",
    selector: row => `${row.valor}`,
    sortable: true,
    right: true,
  },

  {
    name: "Ocorrência",
    selector: (row) => `${row.ocorrencia}`,
    sortable: true,
    wrap: true,
  },

  {
    name: "Histórico",
    selector: (row) => `${row.historico}`,
    sortable: true,
    wrap: true,
  },
];

