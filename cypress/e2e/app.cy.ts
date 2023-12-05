describe("main page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show 7 invoices initially", () => {
    cy.get("[data-cy=invoice]").should("have.length", 7);
  });

  it("'There are 7 total invoices' must be written on the first load", () => {
    cy.contains("There are 7 total invoices");
  });

  it("should open the filter-ul when clicked filter-btn", () => {
    cy.get("[data-cy=filter-btn]").click();
    cy.get("[data-cy=filter-ul]").should("exist");
  });

  it("should hide the filter-ul when clicked anywhere except filter-btn", () => {
    cy.get("[data-cy=filter-btn]").click();
    cy.get("[data-cy=filter-ul]").should("exist");
    cy.get("body").click("topLeft");
    cy.get("[data-cy=filter-ul]").should("not.be.visible");
  });

  it.only("should filter invoices by chosen status", () => {
    cy.get("[data-cy=filter-btn]").click();
    cy.get("[data-cy=filter-ul]").should("exist");
    cy.get("[data-cy=filter-ul]").contains("Paid").click();

    cy.get("[data-cy=invoice]").each((invoice) => {
      cy.wrap(invoice).contains("paid");
    });
  });

  it("should open creating invoice modal when clicked new-invoice", () => {
    cy.get("[data-cy=new-invoice]").click();
    cy.get("[data-cy=creating-modal]").should("exist");
  });

  it("should close creating invoice modal when clicked out of new-invoice", () => {
    cy.get("[data-cy=new-invoice]").click();
    cy.get("[data-cy=creating-modal]").should("exist");
    cy.get("[data-cy=creating-modal-wrapper]").click("right");
    cy.get("[data-cy=creating-modal]").should("not.exist");
  });
});

describe("creating invoice modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=new-invoice]").click();
  });

  const fillEveryInput = () => {
    cy.get("input").then((inputs) => {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "date") {
          cy.wrap(inputs[i]).type("2022-09-09");
        } else if (inputs[i].type === "email") {
          cy.wrap(inputs[i]).type("hoohoo@test.com");
        } else if (inputs[i].type === "number") {
          cy.wrap(inputs[i]).type("15");
        } else {
          cy.wrap(inputs[i]).type("test");
        }
      }
    });
  };

  const fillPaymentTerms = () => {
    cy.get("[data-cy=payment-terms-btn]").click();
    cy.contains("Net 7 days").click();
  };

  it("should close creating invoice modal when clicked cancel button", () => {
    cy.contains("Discard").click();
    cy.get("[data-cy=creating-modal]").should("not.exist");
  });

  it("should warn when clicked Save Changes button if any text input is blank", () => {
    cy.contains("Save Changes").click();
    cy.get("input[type=text]").should("have.class", "border-red");
  });

  it("should warn when clicked 'Save Changes' button without filling item inputs", () => {
    fillPaymentTerms();
    cy.contains("Add New Item").click();

    cy.get("input").then((inputs) => {
      for (let i = 0; i < 12; i++) {
        if (inputs[i].type === "date") {
          cy.wrap(inputs[i]).type("2022-09-09");
        } else if (inputs[i].type === "email") {
          cy.wrap(inputs[i]).type("hoohoo@test.com");
        } else if (inputs[i].type === "number") {
          cy.wrap(inputs[i]).type("15");
        } else {
          cy.wrap(inputs[i]).type("test");
        }
      }
    });

    cy.contains("Save Changes").click();

    cy.get("input").then((inputs) => {
      cy.wrap(inputs[14]).should("have.class", "border-red");
    });
  });

  it("should expect a valid email format", () => {
    cy.get("input").then((inputs) => {
      for (let i = 0; i < 6; i++) {
        if (inputs[i].type === "email") {
          cy.wrap(inputs[i]).type("test.com");
        } else {
          cy.wrap(inputs[i]).type("test");
        }
      }
    });

    cy.contains("Save Changes").click();
    cy.get("input[type=email]").should("have.class", "border-red");
  });

  it("should expect an item must be added", () => {
    cy.contains("An item must be added").should("exist");
    cy.contains("Add New Item").click();
    cy.contains("An item must be added").should("not.exist");
  });

  it("after filling out the form properly, the modal should close and add new invoice", () => {
    cy.contains("Add New Item").click();
    fillEveryInput();
    fillPaymentTerms();
    cy.contains("Save Changes").click();

    cy.get("[data-cy=creating-modal]").should("not.exist");
    cy.get("[data-cy=invoice]").should("have.length", 8);
  });

  it("if clicked 'Save as Draft', the modal should close and add new draft invoice, without forcing the user to fill out all the required fields", () => {
    cy.contains("Save as Draft").click();
    cy.get("[data-cy=creating-modal]").should("not.exist");

    cy.get("[data-cy=invoice]").should("have.length", 8);
  });
});

describe("invoice details page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=invoice]").eq(1).click();
  });

  it("should navigate to the correct page", () => {
    cy.url().should("include", "/invoice");
  });

  it("should show the invoice details page when clicked an invoice", () => {
    cy.contains("#XM9141").should("exist");
    cy.contains("pending").should("exist");
  });

  it("should set the invoice as paid when clicked 'Mark as Paid' button", () => {
    cy.get("[data-cy=status-div]").should("have.text", "• pending");

    cy.contains("Mark as paid").click();
    cy.get("[data-cy=status-div]").should("have.text", "• Paid");
  });

  it("should delete the invoice when clicked 'Delete' button", () => {
    cy.contains("Delete").click();
    cy.get("h2").should("have.text", "Confirm Deletion");
    cy.contains("Delete").click();

    cy.get("[data-cy=invoice]").should("have.length", 6);
  });

  it("should warn when clicked 'Save Changes' button if any text input is blank", () => {
    cy.contains("Edit").click();
    cy.get("input").eq(2).as("blankInput");

    cy.get("@blankInput").clear();
    cy.contains("Save Changes").click();
    cy.get("@blankInput").should("have.class", "border-red");
  });

  it("should close the modal when clicked outside of the modal boundary", () => {
    cy.contains("Edit").click();
    cy.get("[data-cy=create-modal-background]").click("right");
    cy.get("[data-cy=create-modal]").should("not.exist");
  });
});

export {};
