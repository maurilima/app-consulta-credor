import { GetApiEndPoint } from "../../Api/getApiEndPoint";
import { URL_UO } from "../urlApi";

export function disableEnableSpinner(value){
  document.getElementById('progress').style.display = value;
}


export async function getUO(){

  const restUO = await GetApiEndPoint('', URL_UO)

   console.log(restUO)
  const res =   restUO.map((item) =>{
       return {
          "codigo" : item.codigoUnidadeorcamentaria ,
          "descricao" : item.descricaoUnidadeOrcamentaria,
          "sigla"  : item.sigla
               
       }
  
  })
  // console.log(res)
  return res
 
}



export function clearData(data) {
  // console.log(data)

  const localData = data.map(item => {
    return {
      numeroEmpenho : item.numeroEmpenho,
      exercicio     : item.exercicio,
      numeroProcessoSei: item.numeroProcessoSei,
      linkDeAcesso: item.linkDeAcesso,
      codigoUnidadeOrcamentaria    : item.codigoUnidadeOrcamentaria,
      descricaoUnidadeOrcamentaria : item.descricaoUnidadeOrcamentaria,
      dataEmpenho : item.dataEmpenho,
      cpfCnpj : item.cpfCnpj,
      razaoSocial : item.razaoSocial,
      valorEmpenho : parseFloat2Decimals(item.valorEmpenho).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      totalPago : parseFloat2Decimals(item.totalPago).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      totalLiquidado : parseFloat2Decimals(item.totalLiquidado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      totalEstornado : parseFloat2Decimals(item.totalEstornado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    }
  })
  
  // console.log(localData)
  return localData;



}
export function  clearDataTable( data ) {


  //  = 

  const localData = data.map(item => {
    return { 
     numeroDocumento: item.numeroDocumento,
     data: item.data,
     ocorrencia:item.ocorrencia,
     valor: parseFloat2Decimals(item.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
     historico: item.historico,

    }
 })  

 return localData;
  

}

// function formatDate(dateString){ 
//   // const options = { year: "numeric", month: "long", day: "numeric" }
//   const options = { day: "numeric", month: "numeric", year: "numeric" }
//   return new Date(dateString).toLocaleDateString(undefined, options)
// };



export function parseFloat2Decimals(value) {
  if (value != null) {
    return parseFloat(parseFloat(value).toFixed(2));
  }
  else { return 0; }
}


export function validateYear(yearSelected, YearToday) {
  // let year  = document.getElementById("year").value;
  if (yearSelected === '') yearSelected = YearToday;
  if (parseInt(yearSelected) <= 1980 | parseInt(yearSelected) > YearToday) {
    showMessage()
    // alert('Ano nao pode Ser Menor que 1980 ou maior que ' + YearToday)
  }
  else {

  }
}

export function showMessage() {


  // Swal.fire({
  // icon: 'error',
  // title: 'Oops...',
  // text: 'Data Invalida',
  // // footer: '<a href="">Why do I have this issue?</a>'

  // })
}


// export function loadUO(selector) {
//   var listUOSorted = listUO.sort(function (a, b) {
//     return a.descricao < b.descricao ? -1 : a.descricao > b.descricao ? 1 : 0;

//   })
//   let elementos = '<option value = "0"  selected disables>Selecione Unidade Orçamentaria </option>';

//   for (let i = 0; i < listUOSorted.length; i++) {
//     elementos += '<option value="' + listUOSorted[i].codigo + '">' + listUOSorted[i].descricao + '</option>'
//   }
//   selector.innerHTML = elementos;

// }


