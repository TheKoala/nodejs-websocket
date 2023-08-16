import { cadastrarUsuario, encontrarUsuario } from "../db/usuarioDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastrar_usuario", async (dados) => {
    const usuario = await encontrarUsuario(dados.nome);

    if (usuario) {
      socket.emit("usuario_existe");
    } else {
      const resultado = await cadastrarUsuario(dados);
      if (resultado.acknowledged) {
        socket.emit("cadastro_sucesso");
      } else {
        socket.emit("cadastro_erro");
      }
    }
  });
}

export default registrarEventosCadastro;
