// https://docs.cypress.io/api/introduction/api.html

describe("Calendar", () => {
  beforeEach(() => {
    cy.clock(new Date(2000, 1, 1).getTime());
    cy.visit("/month/2000-01");
  });

  it("Calls API on enter", () => {
    cy.contains("h1", "January 2000");
  });

  it("Clicking button prev changes month to previous one", () => {
    cy.contains("h1", "January 2000");

    cy.get(".btn-prev").click();

    cy.contains("h1", "December 1999");
  });

  it("Clicking button next changes month to next one", () => {
    cy.contains("h1", "January 2000");

    cy.get(".btn-next").click();

    cy.contains("h1", "February 2000");
  });

  it("Btn-next is disabled for dates in future", () => {
    const btnNext = cy.get(".btn-next");
    btnNext.should("be.enabled");
    btnNext.click();
    btnNext.should("be.disabled");
  });
});
