describe('Routes: Token', () => {
    const Usuario = app.models.usuario;
    const Cliente = app.models.cliente;

    describe('Usuários POST /token', () => {
        before(done => {
            Usuario
            .remove({_id: {$exists: true}})
            .then(() => {
                let usuario = new Usuario({
                    nome: 'Braz',
                    email: 'braz@email.com',
                    senha: '123456'
                });
                usuario.senha = usuario.generateHash(usuario.senha);
                usuario.save();
            })
            .then(() => done());
        });
        describe('status 200', () => {
            it('retorna um token de usuário autenticado', done => {
                request.post('/token')
                .send({
                    email: 'braz@gmail.com',
                    senha: '123456'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.contain.key('token');
                    //console.log('Usuario: ', res.body);
                    done(err);
                });
            });
        });
        describe('status 401', () => {
            it('lança um erro quando a senha do usuário está incorreta', done => {
                request.post('/token')
                .send({
                    email: 'braz@gmail.com',
                    senha: 'SENHA_ERRADA'
                })
                .expect(401)
                .end((err, res) => {
                    done(err);
                })
            });
            it('lança um erro quando o email do usuário não existe', done => {
                request.post('/token')
                .send({
                    email: 'EMAIL_ERRADO',
                    senha: '123456'
                })
                .expect(401)
                .end((err, res) => {
                    done(err)
                });
            });
            it('lança um erro quando o email ou a senha do usuário está em branco', done => {
                request.post('/token')
                .send({
                    email: '',
                    senha: ''
                })
                .expect(401)
                .end((err, res) => {
                    done(err)
                });
            });
        });
    });
    describe('Clientes POST /token', () => {
        before(done => {
            Cliente
            .remove({_id: {$exists: true}})
            .then(() => {
                let cliente = new Cliente({
                    nome: 'Cliente',
                    email: 'cliente@gmail.com',
                    senha: 'cliente123'
                });
                cliente.senha = cliente.generateHash(cliente.senha);
                cliente.save();
            })
            .then(() => done());
        });
        describe('status 200', () => {
            it('retorna um cliente autenticado', done => {
                request.post('/token')
                .send({
                    email: 'cliente@gmail.com',
                    senha: 'cliente123'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.contain.key('token');
                    //console.log('Cliente: ', res.body);
                    done(err);
                });
            });
        });
        describe('status 401', () => {
            it('lança um erro quando a senha do cliente está incorreta', done => {
                request.post('/token')
                .send({
                    email: 'cliente@gmail.com',
                    senha: 'SENHA_ERRADA'
                })
                .expect(401)
                .end((err, res) => {
                    done(err);
                })
            });
            it('lança um erro quando o email do cliente não existe', done => {
                request.post('/token')
                .send({
                    email: 'EMAIL_ERRADO',
                    senha: 'cliente123'
                })
                .expect(401)
                .end((err, res) => {
                    done(err)
                });
            });
            it('lança um erro quando o email ou a senha do cliente está em branco', done => {
                request.post('/token')
                .send({
                    email: '',
                    senha: ''
                })
                .expect(401)
                .end((err, res) => {
                    done(err)
                });
            });
        });
    });
});