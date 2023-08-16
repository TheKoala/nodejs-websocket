import { MongoClient } from "mongodb";
import "dotenv/config.js";

const cliente = new MongoClient(process.env.STRING_CONEXAO_DB);

let documentosColecao, usuariosColecao;

try {
  await cliente.connect();
  
  const db = cliente.db("alura-websockets"); 
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");

  console.log("Conexão bem sucedida");
} catch (error) {
  console.log(error);
}

export { documentosColecao, usuariosColecao };
