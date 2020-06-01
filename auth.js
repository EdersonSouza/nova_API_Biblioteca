import passport from 'passport';
import {
	Strategy,
	ExtractJwt
} from 'passport-jwt';

module.exports = app => {
	const Usuario = app.models.usuario;
	const Cliente = app.models.cliente;
	const cfg = app.libs.config;
	const params = {
		secretOrKey: cfg.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	};
	const strategy = new Strategy(params, (payload, done) => {
		Usuario.findById(payload.id)
			.then(usuario => {
				if (usuario) {
					return done(null, {
						id: usuario._id,
						email: usuario.email
					});
				}
				return done(null, false);
			})
			.catch(error => done(null, false));
		// .catch(() => {
		//     console.log('Auth cliente')
		//     Cliente.findById(payload.id)
		//     .then(cliente => {
		//         if (cliente) {
		//             return done(null, {
		//                 id: cliente._id,
		//                 email: cliente.email
		//             });
		//         }
		//         return done(null, false);
		//     })
		//     .catch(error => done(null, false));
		// });

	});
	passport.use(strategy);
	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate('jwt', cfg.jwtSession);
		}
	};
}