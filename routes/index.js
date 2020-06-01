module.exports = app => {
    /**
     * 
     * @api {get} / API Status
     * @apiName Index
     * @apiGroup Status
     * @apiVersion  1.0.0
     * @apiSuccess {String} status Mensagem de status da API
     * 
     * 
     * @apiSuccessExample {json} Sucesso:
     *  HTTP/1.1 200 OK
     * {
     *  "status": "Papaléguas-API"
     * }
     * 
     * 
     */
    app.get('/', (req, res) => {
        res.json({ status: 'Papaléguas-API' })
    });
}

