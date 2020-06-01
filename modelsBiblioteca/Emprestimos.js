import { Schema, model } from "mongoose";

const EmprestimoSchema = new Schema({
 
  aluno:{type: Schema.Types.ObjectId, ref: 'Aluno' },
  livros:[{type: Schema.Types.ObjectId, ref: 'Livro' }],
  ativo:{type:Boolean, default:true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("Emprestimo", EmprestimoSchema);