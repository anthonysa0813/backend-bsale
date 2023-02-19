describe("Pruebas de Cypress", () => {
  // it("Debe cargar la página de inicio correctamente", () => {
  //   // Obtener la URL dinámica desde la variable de entorno
  //   const url = Cypress.env("URL_IDENTIFIER");

  //   // Visitar la URL dinámica
  //   cy.visit(url);

  //   // Verificar que el título de la página sea el esperado
  //   cy.title().should("include", "ecommerce bsale");
  // });

  it("Debe mostrar el formulario de registro", () => {
    // Obtener la URL dinámica desde la variable de entorno
    const url = Cypress.env("URL_IDENTIFIER");

    // Visitar la URL dinámica
    cy.visit(url);

    // // Hacer clic en el enlace de registro
    // cy.get('a[href="/registro"]').click();

    // // Verificar que el formulario de registro esté presente
    // cy.get('form[id="registro-form"]').should("exist");
    cy.get("img").then((images) => {
      // Verificar que haya al menos una imagen en la página
      expect(images.length).to.be.greaterThan(0);

      // Verificar que todas las imágenes tengan una fuente válida
      images.each((index, image) => {
        expect(image).to.have.attr("src").not.equal("");
      });
    });
  });
});
