import changeCase from 'change-case';
module.exports = app => {
	const Usuario = app.models.usuario;
	app.route('/usuario/:id')
		//.all(app.auth.authenticate())
		/**
		 * 
		 * @api {get} /usuario Exibe usuario autenticado
		 * @apiGroup Usuario
		 * @apiVersion  1.0.0
		 * @apiHeader {String} Authorization Token de usuário
		 * @apiHeaderExample {json} Header:
		 *    {
		 *      "Authorization": "xyz.12@.asdfdnf"
		 *    }
		 * 
		 * @apiSuccess {Number} id Id de registro
		 * @apiSuccess {String} nome Nome
		 * @apiSuccess {String} email Email
		
		* @apiSuccessExample {json} Successo:
		* HTTP/1.1 200 OK
		* {
		*     id : "9b1SKdskdksndksndd23293",
		*     nome: "João",
		*     email: "joao@joao.email.com"
		* }
		* @apiErrorExample {json} Erro de consulta:
		HTTP/1.1	412	Precondition	Failed
		*/
		.get((req, res) => {
			Usuario.findById(req.params.id)
				.then(result => res.json(result))
				.catch(error => res.status(412).json({ msg: error.message }));
		})

		.put((req, res) => {
			let usuario = new Usuario(req.body);
			if(usuario.senha) { 
				usuario.senha = usuario.generateHash(req.body.senha);
			}
			usuario.nome = changeCase.titleCase(usuario.nome);
			usuario.endereco.rua = changeCase.titleCase(usuario.endereco.rua);
			usuario.endereco.bairro = changeCase.titleCase(usuario.endereco.bairro);
			usuario.endereco.cidade = changeCase.titleCase(usuario.endereco.cidade);
			Usuario.updateOne({ _id: req.params.id }, usuario)
				.then(result => res.json(result))
				.catch(error => res.status(412).json({ msg: error.message }));
		})
		/**
		 * 
		 * @api {delete} /usuario Exclui um usuário
		 * @apiGroup Usuario
		 * @apiVersion  1.0.0
		 * @apiHeader {String} Authorization Token de usuário
		 * @apiHeaderExample {json} Header:
		 *    {
		 *      "Authorization": "xyz.12@.asdfdnf"
		 *    }
		 * @apiSuccessExample {json} Successo:
		 *  HTTP/1.1 204 No	Content
		 * @@apiErrorExample {json} Erro na exclusão:
		 HTTP/1.1	412	Precondition	Failed
		* 
		*/
		.delete((req, res) => {
			Usuario.deleteOne({ _id: req.params.id })
				.then(result => res.json(result))
				.catch(error => res.status(412).json({ msg: error.message }));
		});
	app.route('/usuario')
		.post((req, res) => {
			let usuario = new Usuario(req.body);
			usuario.senha = usuario.generateHash(req.body.senha);
			usuario.save()
				.then(result => res.json(result))
				.catch(error => {
					if (error && error.code === 11000) {
						res.status(412).json({ msg: 'Email ou CPF já cadastrado.' });
					}
					else {
						res.status(412).json({ msg: error.message });
					}
				});
		})
		.get((req, res) => {
			Usuario.find()
				.then(result => res.json(result))
				.catch(error => res.status(412).json({ msg: error.message }));
		})
}