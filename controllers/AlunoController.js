import Aluno from "../modelsBiblioteca/Aluno";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.find();

    return res.json(alunos);
  }

  async show(req, res) {
    const { id } = req.params;
    const aluno = await Aluno.findById(id);

    return res.json(aluno);
  }

  async store(req, res) {
    const { body } = req;
    const aluno = await Aluno.create(body);

    return res.json(aluno);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const aluno = await Aluno.findByIdAndUpdate(id, body, {
      new: true
    });

    return res.json(aluno);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Aluno.findByIdAndDelete(id);

    return res.send();
  }
}

export default new AlunoController();