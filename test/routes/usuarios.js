import jwt from 'jwt-simple'

describe('Routes: Usuário Autenticado', () => {
    const Usuario = app.models.usuario;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;

    beforeEach(done => {
        Usuario
        .remove({})
        .then(() => {
            let usuario = new Usuario({
                nome: 'Braz',
                email: 'braz@email.com',
                senha: '123456'
            });
            usuario.save()
            .then(usuario => {
                token = jwt.encode({ id: usuario.id }, jwtSecret);
                done()
            });
        });        
    });
    describe('GET /usuario', () => {
        describe('status 200', () => {
            it('retorna um usuário autenticado', done => {
                request.get('/usuario')
                .set("Authorization", `bearer ${token}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.nome).to.eql('Braz');
                    expect(res.body.email).to.eql('braz@email.com');
                    done(err)
                });
            });
        });
    });
});