import { emitirAdicionaDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");
console.log(tokenJwt);
const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const input = document.getElementById("input-documento");
const botaoLogout = document.getElementById("botao-logout");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  emitirAdicionaDocumento(input.value);
  input.value = "";
});

botaoLogout.addEventListener("click", () => {
  removerCookie("tokenJwt");
  alert("Usuário deslogado com sucesso!");
  window.location.href = "/login/index.html";
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
