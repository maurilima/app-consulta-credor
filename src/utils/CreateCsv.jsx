import { URL_DP } from "../Config/urlApi";
import { GetApiEndPoint } from "../Api/getApiEndPoint";

let lRaw = {};

export async function createCvs(raw) {
  var now = new Date();
  var dia = now.getDate();
  var mes    = now.getMonth();

  var hora = now.getHours();
  var minuto = now.getMinutes();
  var ano = now.getFullYear();

  lRaw = JSON.parse(raw);

  let response = await GetApiEndPoint(lRaw, URL_DP);

  const totalElements = response.totalElements;
  
  lRaw = { ...lRaw, size: totalElements };

  response = await GetApiEndPoint(lRaw, URL_DP);

  response = response.content;

  const replacer = (key, value) => (value === null ? "" : value.toString()); // specify how you want to handle null values here
  const header = Object.keys(response[0]);
  let csv = response.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(";")
  );
  csv.unshift(header.join(";"));
  csv = csv.join("\r\n");

  downloadCSV(csv, "DespesaCSV" + hora + minuto + dia + mes + ano);
}

function downloadCSV(csvStr, fileName) {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName + ".csv";
  hiddenElement.click();
}

export async function createJSON(raw) {
  var now = new Date();
  var hora = now.getHours();
  var minuto = now.getMinutes();
  var dia = now.getDate();
  var mes    = now.getMonth();
  var ano = now.getFullYear();

  lRaw = JSON.parse(raw);

  let response = await GetApiEndPoint(lRaw, URL_DP);

  const totalElements = response.totalElements;
  
  lRaw = { ...lRaw, size: totalElements };

  response = await GetApiEndPoint(lRaw, URL_DP);

  const data = JSON.stringify(response.content);

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(data);
  hiddenElement.target = '_blank';
  hiddenElement.download =  'DespesaJSON'+ hora + minuto + dia + mes + ano + '.json';
  hiddenElement.click();

}
