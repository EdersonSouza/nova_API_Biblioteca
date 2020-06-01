import jwt from 'jwt-simple';
/**
 * 
 * @api {post} /token Token Autenticado
 * @apiGroup Credencial
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} email Email de usuário
 * @apiParam  {String} senha Senha de usuário
 * 
 * @apiParamExample  {json} Entrada:
 * {
 *     email : "joao@joao.email.com",
 *     senha : "123456"
 * }
 * @apiSuccess {String} token Token de usuário autenticado
 * 
 * @apiSuccessExample {json} Successo:
 *  HTTP/1.1 200 OK
 * {
 *     token : "xyz.12@.asdfdnf"
 * }
 * @@apiErrorExample {json} Erro de autenticação:
     HTTP/1.1 401 Unauthorized 
 */
module.exports = app => {
	const cfg = app.libs.config;
	const Usuario = app.models.usuario;
	const Cliente = app.models.cliente;

	app.post('/token', (req, res) => {
		if (req.body.email && req.body.senha) {
			const email = req.body.email;
			const senha = req.body.senha;


			Usuario.findOne({ email: email })
				.then(usuario => {
					if (!usuario) {
						res.sendStatus(401);
					} else if (usuario.validPassword(usuario.senha, senha)) {
						const payload = { id: usuario._id };
						res.json({
							token: jwt.encode(payload, cfg.jwtSecret),
							user: usuario
						});
					} else {
						res.sendStatus(401);
					}
				})
				.catch(err => {
					res.send(err)
					// Cliente.findOne({ email: email})
					// .then(cliente => {
					//     if (cliente.validPassword(cliente.senha, senha)) {
					//         const payload = { id: cliente._id};
					//         res.json({
					//             token: jwt.encode(payload, cfg.jwtSecret)
					//         });
					//     } else {
					//         res.sendStatus(401);
					//     }
					// })
					// .catch(() => res.sendStatus(401));
				});
		} else {
			res.sendStatus(401);
		}
	});
};