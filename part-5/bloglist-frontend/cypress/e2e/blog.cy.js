describe("Blog app", () => {
  beforeEach(() => {
    cy.resetdb();
    const user1 = {
      name: "tester",
      username: "tester",
      password: "tester",
    };
    cy.adduser(user1);
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.get("h2").contains("Log in to application");
    cy.get("form").as("loginForm").contains("username");
    cy.get("@loginForm").contains("password");
    cy.get("@loginForm").find("input:first");
    cy.get("@loginForm").find("input:last");
  });
});
