import moment from 'moment'
import livros from '../controllers/LivroController'
module.exports = app => {
 
  app.route('/livros')
    .get(livros.index)
    .post(livros.store) 
      

}