import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const dbURI = 'mongodb://localhost/DBbiblioteca';

module.exports = () => {
    
    if(process.env.NODE_ENV == undefined){
        let db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'Falha na conexão'));
        
        db.once('open', () => console.log('Conectado ao mongoDB'));
    }
    
    return mongoose.connect(dbURI);
}