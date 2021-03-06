const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  }); // End of beforeEach

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });

  });

  describe("POST /users", () => {

    it("should create a new user with valid values and redirect", (done) => {
      const options = {
        url: base,
        form: {
          username: "Jon_Doe",
          email: "user@example.com",
          password: "123456",
          role: "standard"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({where: {email: "user@example.com"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.username).toBe("Jon_Doe");
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post({
        url: base,
        form: {
          name: "Jon Doe",
          email: "nodoeformoe",
          password: "123456",
          role: "standard"
        }
      }, (err, res, body) => {
        User.findOne({where: {email: "nodoeformoe"}})
        .then((user) => {
          expect(user).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign In");
        done();
      });
    });

  });

  describe("GET /users/upgrade", () => {

    it("should render a view with upgrade plan page", (done) => {
      request.get(`${base}upgrade`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Upgrade Account");
        done();
      });
    });

  });

  describe("GET /users/downgrade", () => {

    it("should render a view with downgrade option", (done) => {
      request.get(`${base}downgrade`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Downgrade Account");
        done();
      });
    });
  });

});
