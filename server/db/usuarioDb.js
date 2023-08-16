import { usuariosColecao } from "./dbconnect.js";

function cadastrarUsuario({ nome, senha }) {
  return usuariosColecao.insertOne({ nome, senha });
}

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

export { cadastrarUsuario, encontrarUsuario };
