const socket = io();

function emitirAutenticacao(dados) {
  socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", () => {
  alert("VC conseguiu");
  window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("VC eRROU"));

socket.on("usuario_nao_encontrado", () => alert("não te achei"));

export { emitirAutenticacao };
