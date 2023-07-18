import { documentosColecao } from "./dbconnect.js";

function encontrarDocumento(nome) {
  const documento = documentosColecao.findOne({ nome });
  return documento;
}

function atualizaDocumento(nome, texto) {
  const atualizacao = documentosColecao.updateOne(
    { nome },
    { $set: { texto } }
  );
  return atualizacao;
}

export { encontrarDocumento, atualizaDocumento };
