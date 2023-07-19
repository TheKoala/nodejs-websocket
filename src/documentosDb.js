import { documentosColecao } from "./dbconnect.js";

function listaDocumentos() {
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function encontrarDocumento(nome) {
  const documento = documentosColecao.findOne({ nome });
  return documento;
}

function criarDocumento(nome) {
  const resultado = documentosColecao.insertOne({
    nome: nome,
    texto: "",
  });

  return resultado;
}

function atualizaDocumento(nome, texto) {
  const atualizacao = documentosColecao.updateOne(
    { nome },
    { $set: { texto } }
  );
  return atualizacao;
}

function excluirDocumento(nome) {
  const resultado = documentosColecao.deleteOne({ nome });
  return resultado;
}

export {
  encontrarDocumento,
  atualizaDocumento,
  listaDocumentos,
  criarDocumento,
  excluirDocumento,
};
