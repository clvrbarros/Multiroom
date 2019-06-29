module.exports.iniciaChat = (application, req, res) => {
    var dadosForm = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome pequeno cuzao. Tenta com mais de 4 letras').len(5,15);

    var error = req.validationErrors();

    if(error){
        res.render('index',{validacao:error});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {
            apelido: dadosForm.apelido,
            mensagem: 'acabou de entrar no chat',
        }
        );

    res.render('chat', {dadosForm : dadosForm});
}