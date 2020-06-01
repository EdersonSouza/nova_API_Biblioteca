import mongoose from 'mongoose';
import brcypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;
import titlize from 'mongoose-title-case';

module.exports = () => {
	let usuarioSchema = new Schema({
		avatar: { type: String },
		nome: { type: String, trim: true },
		rg: { type: String, trim: true },
		cpf: { type: String, unique: true },
		email: { type: String, unique: true, lowercase: true},
		senha: { type: String },
		endereco: {
			rua: { type: String },
			numero: { type: Number },
			bairro: { type: String },
			cep: { type: String },
			cidade: { type: String },
			uf: { type: String },
		},
		adm: Boolean,
		fones: [],
		servicos: [],
		_usuarioId: {type: Schema.Types.ObjectId, ref: 'Usuario'}
	});

	usuarioSchema.plugin(titlize, {
		paths: ['nome', 'endereco.rua', 'endereco.bairro', 'endereco.cidade'],
		trim: true
	});
	usuarioSchema.methods.generateHash = (senha) =>
		brcypt.hashSync(senha, brcypt.genSaltSync(8), null);

	usuarioSchema.methods.validPassword = (encodedSenha, senha) =>
		brcypt.compareSync(senha, encodedSenha);

	return mongoose.model('Usuario', usuarioSchema);
}