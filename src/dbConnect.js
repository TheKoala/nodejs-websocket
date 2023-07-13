import { MongoClient } from "mongodb";

const cliente = new MongoClient(process.env.STRING_CONEXAO_DB);

let documentosColecao;

try {
  await cliente.connect();
  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  console.log("Conexão bem sucedida");
} catch (error) {
  console.log(error);
}

export { documentosColecao };
