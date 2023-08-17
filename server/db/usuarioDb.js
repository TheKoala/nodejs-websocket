import criarHashESalSenha from "../utils/senhaUtils.js";
import { usuariosColecao } from "./dbconnect.js";

function cadastrarUsuario({ nome, senha }) {

  const { hashSenha, salSenha} = criarHashESalSenha(senha);

  return usuariosColecao.insertOne({ nome, hashSenha, salSenha });
}

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

export { cadastrarUsuario, encontrarUsuario };
