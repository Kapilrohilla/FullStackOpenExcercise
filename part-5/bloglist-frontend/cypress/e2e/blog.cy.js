describe("Blog app", () => {
  beforeEach(() => {
    cy.resetdb();
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.get("h2").contains("Log in to application");
    cy.get("form").as("loginForm").contains("username");
    cy.get("@loginForm").contains("password");
    cy.get("@loginForm").find("input:first");
    cy.get("@loginForm").find("input:last");
  });
  describe("login", () => {
    const user1 = {
      name: "tester",
      username: "tester",
      password: "tester",
    };
    beforeEach(() => {
      cy.adduser(user1);
    });
    it("successful when credentials are correct", function () {
      cy.get("input:first").type(user1.username);
      cy.get("input:last").type(user1.password);
      cy.get("button").click();
      cy.contains("login successful")
        .should("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
      cy.contains(`${user1.username} logged in`);
    });
    it("fails with wrong credentials", function () {
      cy.get("input:first").type(user1.username);
      cy.get("input:last").type("wrong");
      cy.get("button").click();
      cy.contains("Wrong username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
    describe("blogs", function () {
      beforeEach(() => {
        cy.login({
          username: user1.username,
          password: user1.password,
        });
        return;
      });
      it.only("possible to create", function () {
        cy.get("button").contains("create new blog").click();
        cy.get("form").as("createBlogForm");
        cy.get("@createBlogForm")
          .contains("title")
          .parent()
          .find("input")
          .type("new blog");
        cy.get("@createBlogForm")
          .contains("author")
          .parent()
          .find("input")
          .type("tester");
        cy.get("@createBlogForm")
          .contains("url")
          .parent()
          .find("input")
          .type("xyz.com");
        cy.get("@createBlogForm").find("button").contains("CREATE").click();
        cy.contains("new blog");
        cy.contains("successfully add: new blog")
          .should("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
      });
    });
  });
});
