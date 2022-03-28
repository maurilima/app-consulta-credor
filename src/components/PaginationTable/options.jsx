export const paginationOptions = {
  rowsPerPageText: "Linhas por Página",
  rangeSeparatorText: "de",
  selectAllRowsItemText: "Todos",
  selectAllRowsItem: true,
  paginationRowsPerPageOptions: [20, 25, 30],
};

export const customStyle = {
  content: {
    top: "12%",
    left: "5rem",
    right: "5rem",
    bottom: "1rem",
    marginTop: "1rem",
  },
};



export const columnsEmpenho = [
  {
    name: "Nº Documento(NOB)",
    selector: row => `${row.numeroDocumento}`,
    sortable: true,
    wrap: true,
    grow: 0.9,
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
    grow: 0.6,
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

