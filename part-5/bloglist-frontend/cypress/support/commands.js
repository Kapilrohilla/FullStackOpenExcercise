// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("adduser", ({ username, name, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/user`, {
    username,
    name,
    password,
  });
});
Cypress.Commands.add("resetdb", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
});
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    window.localStorage.setItem("loggedInUser", JSON.stringify(body));
  });
  cy.visit("");
});
Cypress.Commands.add("createblog", ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem("loggedInUser")).token
      }`,
    },
  });
  cy.visit("");
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
