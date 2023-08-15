describe("Blog app", () => {
  beforeEach(() => {
    cy.resetdb();
    const user1 = {
      name: "tester",
      username: "tester",
      password: "tester",
    };
    cy.adduser(user1);
  });
  it("passes", () => {
    cy.visit("");
  });
});
