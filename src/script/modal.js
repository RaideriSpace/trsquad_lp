 $(document).ready(function () {
    $("#form-contato").on("submit", function (e) {
      e.preventDefault();

      // Validação ou chamada AJAX
      
      // Simulando sucesso:
      $("#form-contato")[0].reset();
      const modal = new bootstrap.Modal(document.getElementById("formModal"));
      modal.show();
    });
  });