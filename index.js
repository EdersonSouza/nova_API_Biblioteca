import express from 'express';
import consign from 'consign';

const app = express();

consign({verbose: false})
.include('libs/config.js')
.then('controllers')
.then('db.js')
.then('models')
.then('auth.js')
.then('libs/middlewares.js')
.then('routes')
.then('libs/boot.js')
.into(app)
const Usuario = app.models.usuario;
Usuario.find()
	.exec(function (err, dados) {
		if (err) {
			console.log("erro ao acessar banco")
		} else {
			if (dados.length === 0) {
				console.log("cadastrando usuario super ")
				let user = new Usuario()
				user.nome = "TwoTec"
				user.rg = "123123123"
				user.cpf = "000.000.000-00"
				user.email = "twotecdevelop@gmail.com"
				user.senha = user.generateHash('twotec123');
				user.adm = true
				user.super = true
				user.save(function (err, result) {
					if (result) {
						console.log("usuario " + user.nome + " " + "cadastrado com sucesso")
					} else {
						if (err) {
							console.log("erro ao salvar usuario")
						}
					}
				})
			}
		}
	})

export default app;