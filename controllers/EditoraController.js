import Editora from "../modelsBiblioteca/Editora";

class EditoraController {
  async index(req, res) {
    const editoras = await Editora.find();

    return res.json(editoras);
  }

  async show(req, res) {
    const { id } = req.params;
    const editora = await Editora.findById(id);

    return res.json(editora);
  }

  async store(req, res) {
    const { body } = req;
    const editora = await Editora.create(body);

    return res.json(editora);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const editora = await Editora.findByIdAndUpdate(id, body, {
      new: true
    });

    return res.json(editora);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Editora.findByIdAndDelete(id);

    return res.send();
  }
}

export default new EditoraController();