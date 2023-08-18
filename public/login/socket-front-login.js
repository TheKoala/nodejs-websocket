import { definirCookie } from "../utils/cookies.js"

const socket = io();

function emitirAutenticacao(dados) {
  socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
  alert("VC conseguiu");
  definirCookie("tokenJwt", tokenJwt);
  window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("VC eRROU"));

socket.on("usuario_nao_encontrado", () => alert("não te achei"));

export { emitirAutenticacao };
