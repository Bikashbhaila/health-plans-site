/// <reference types="cypress" />

describe("TRASE Health Plans - End to End", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("loads the browser page and displays grid data", () => {
        cy.contains("TRASE Health Plans").should("exist");

        // Wait for AG Grid rows
        cy.get(".ag-center-cols-container .ag-row")
            .should("have.length.greaterThan", 5);
    });

    it("searches plans correctly", () => {
        cy.get("input").first().type("Silver");

        cy.contains("Standard Silver").should("exist");
        cy.contains("Basic Bronze").should("not.exist");
    });

    it("toggles sort by monthly premium", () => {
        cy.contains("Sort by monthly premium").click();

        // Grab first two premiums to check sorted order
        cy.get('.ag-cell[col-id="monthlyPremium"]')
            .then((cells) => {
                const values = [...cells].map((c) => Number(c.innerText));
                const first = values[0];
                const second = values[1];
                expect(first).to.be.lessThan(second);
            });
    });

    it("selects up to 3 plans and blocks the 4th", () => {
        // Checkboxes exist
        cy.get('.ag-checkbox-input').should("exist");

        // Select 3 plans
        cy.get('.ag-checkbox-input').eq(1).click();
        cy.get('.ag-checkbox-input').eq(2).click();
        cy.get('.ag-checkbox-input').eq(3).click();

        cy.contains("Selected for compare: 3/3").should("exist");

        // Try selecting a 4th → should show warning Snackbar
        cy.get('.ag-checkbox-input').eq(4).click();

        cy.contains("You can only compare upto 3 plans").should("exist");
    });

    it("enables Compare button when plans are selected", () => {
        cy.get('.ag-checkbox-input').eq(1).click();
        cy.get('.ag-checkbox-input').eq(2).click();

        cy.contains("Compare").should("not.be.disabled");
    });

    it("navigates to Compare Page with correct data", () => {
        // Select 2 plans
        cy.get('.ag-checkbox-input').eq(1).click();
        cy.get('.ag-checkbox-input').eq(2).click();

        // Click Compare
        cy.contains("Compare").click();

        // URL updates
        cy.url().should("include", "/compare");

        // Table headers appear
        cy.contains("Monthly premium").should("exist");
        cy.contains("Deductible").should("exist");
    });

    it("navigates back from Compare Page", () => {
        cy.visit("/");

        // Click the first checkbox using the correct AG Grid selector
        cy.get('.ag-checkbox-input').eq(1).click();
        cy.get('.ag-checkbox-input').eq(2).click();

        // Wait for ComparisonTray to update
        cy.contains("Compare").should("not.be.disabled").click();

        // Click Back
        cy.get("[data-cy='back-button']").click();

        // Verify back at root
        cy.location("pathname").should("eq", "/");
    });

});
