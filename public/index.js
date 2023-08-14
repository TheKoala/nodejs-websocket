import { emitirAdicionaDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const input = document.getElementById("input-documento");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  emitirAdicionaDocumento(input.value);
  input.value = "";
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
    <a href="documento/index.html?nome=${nomeDocumento}" 
      class="list-group-item list-group-item-action" 
      id="documento-${nomeDocumento}">     
      ${nomeDocumento}
    </a>
  `;
}

function removerDocumentoLista(nome) {
  const documento = document.getElementById(`documento-${nome}`);
  listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerDocumentoLista };
