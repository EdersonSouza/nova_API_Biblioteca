describe("Routes: Index", () => {
    describe("GET /", () => {
      it("retorna o status da API", done => {
        request.get('/')
          .expect(200)
          .end((err, res) => {
            const expected = {status: "Biblioteca-API"};
            expect(res.body).to.eql(expected);
            done(err);
          });
      });
    });
  });