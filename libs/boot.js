module.exports = app => {

    if (process.env.NODE_ENV !== 'test'){
        app.listen(app.get('port'), () => {
            console.log(`Car Wash API - listening on port: ${app.get('port')}`);
        });
    }
}