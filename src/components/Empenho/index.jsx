// import './index.css'

import reactDom from "react-dom";
import { ContainerStyled } from "./style";



function Empenho(lRow) {
  console.log(lRow);
  reactDom.render(<RenderEmpenho />, document.getElementById("empenho"));
}

// import { Container } from './styles';


function RenderEmpenho() {
   
const ClosePagina = () => {
 

}
  return (
    <div id="renderEmpenho">
      <ContainerStyled>
        <h1>Nova</h1>
        <button onClick={ClosePagina }>Fechar</button>
      </ContainerStyled>
    </div>
  );
}


export default Empenho;
