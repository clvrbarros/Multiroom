const app = require('./config/server');


const server = app.listen(80, () => {
    console.log('Servidor online');
})

const io = require('socket.io').listen(server);
app.set('io', io);

// Criar conexao por websocket
io.on('connection', (socket) => {
    console.log('Usuario conectou');

    socket.on('disconnect', () => {
        console.log('Usuario desconectou');
    })

    socket.on('msgParaServidor', (data) => {
        socket.emit('msgParaCliente',
            {apelido: data.apelido, mensagem:data.mensagem}
        );
        socket.broadcast.emit('msgParaCliente',
            {apelido: data.apelido, mensagem:data.mensagem}
        );
    });
});
