import {
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const documento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");

tituloDocumento.textContent = documento || "Documento sem titulo";
selecionarDocumento(documento);

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({ texto: textoEditor.value, documento});
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
