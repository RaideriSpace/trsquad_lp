// Script para formulário local (simulação de envio)
document.addEventListener("DOMContentLoaded", function () {

    // Referências aos elementos do formulário e modal
    const form = document.querySelector("#form-contato");

    if (!form) {
        console.warn("Formulário com ID 'form-contato' não encontrado. Verifique o HTML.");
        return;
    }

    const modalElement = document.getElementById("formModal");
    let modal;
    if (modalElement) {
        modal = new bootstrap.Modal(modalElement);
    } else {
        console.warn("Modal com ID 'formModal' não encontrado. Verifique o HTML.");
    }

    const button = form.querySelector("#btn-enviar");
    const spinner = button ? button.querySelector(".spinner-border") : null;

    // --- Elementos e Regex para validação de celular ---
    const celularInput = document.getElementById('celular');
    const celularErrorSpan = document.getElementById('celular-error');

    // Regex para validar número de celular brasileiro.
    // Mais flexível para aceitar com/sem +55, com/sem DDD entre parênteses,
    // com/sem espaços/hífens, e o '9' opcional no início após o DDD.
    const regexCelular = /^\+?(\d{2})?\s*(\(?\d{2}\)?)?\s*9?\s*\d{4}[-\s]?\d{4}$/;


    // --- Função de validação específica para o campo de celular ---
    function validateCelular() {
        if (!celularInput) return true; // Se o input não existe, considera válido

        const celularValue = celularInput.value.trim();

        // Limpa erros anteriores do celular
        if (celularErrorSpan) {
            celularErrorSpan.style.display = 'none';
            celularErrorSpan.textContent = '';
        }
        celularInput.classList.remove('is-invalid'); // Remove classe de erro do Bootstrap

        if (celularValue === '') {
            if (celularErrorSpan) {
                celularErrorSpan.textContent = 'Por favor, digite o número do celular.';
                celularErrorSpan.style.display = 'block';
            }
            celularInput.classList.add('is-invalid');
            return false;
        } else if (!regexCelular.test(celularValue)) {
            if (celularErrorSpan) {
                celularErrorSpan.textContent = 'Número de celular inválido. Use o formato (XX) 9XXXX-XXXX ou similar.';
                celularErrorSpan.style.display = 'block';
            }
            celularInput.classList.add('is-invalid');
            return false;
        }
        return true; // Número válido
    }

    // --- Listener para validação de celular no evento 'blur' (ao sair do campo) ---
    if (celularInput) {
        celularInput.addEventListener('blur', validateCelular);
    }

    // --- Listener principal de SUBMIT do formulário ---
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const inputs = form.querySelectorAll("input, textarea");
        let valido = true; // Flag geral de validação para todos os campos

        // 1. Resetar todas as validações (Bootstrap e customizadas)
        inputs.forEach((input) => {
            input.classList.remove("is-invalid"); // Remove classe de erro do Bootstrap
            const erroFeedback = input.nextElementSibling;
            if (erroFeedback && erroFeedback.classList.contains("invalid-feedback")) {
                // Remove mensagens de erro geradas dinamicamente
                erroFeedback.remove();
            }
        });
        // Resetar especificamente o erro do celular
        if (celularErrorSpan) {
            celularErrorSpan.style.display = 'none';
            celularErrorSpan.textContent = '';
        }
        celularInput.classList.remove('is-invalid');


        // 2. Validar campos requeridos (geral)
        inputs.forEach((input) => {
            // Exclui o celular, que tem validação própria mais complexa
            if (input.hasAttribute('required') && input.id !== 'celular') {
                if (!input.value.trim()) { // Verifica se o valor está vazio após remover espaços em branco
                    valido = false;
                    input.classList.add("is-invalid"); // Adiciona classe de erro do Bootstrap

                    const msg = document.createElement("div");
                    msg.className = "invalid-feedback"; // Classe do Bootstrap para feedback de erro
                    // Usa o data-error ou uma mensagem padrão baseada no placeholder/nome
                    msg.textContent = input.dataset.error || `O campo '${input.placeholder || input.name}' é obrigatório.`;
                    input.insertAdjacentElement("afterend", msg); // Insere a mensagem após o input
                }
            }
        });

        // 3. Adicionar validação do celular à validação geral
        const isCelularValid = validateCelular(); // Executa a validação do celular
        if (!isCelularValid) {
            valido = false; // Se o celular for inválido, a validação geral falha
        }

        // --- Se qualquer validação falhou, interrompe o processo de envio ---
        if (!valido) {
            // Opcional: Rolar a página até o primeiro campo inválido para o usuário ver
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return; // Sai da função de submit
        }

        // --- Se TODAS as validações passaram (campos preenchidos e celular válido) ---
        // Mostrar loading no botão
        if (spinner) {
            spinner.classList.remove("d-none"); // Mostra o spinner
        }
        if (button) {
            button.setAttribute("disabled", true); // Desabilita o botão
        }

        // Simular envio (usando setTimeout para simular um processo assíncrono)
        setTimeout(() => {
            form.reset(); // Limpa o formulário
            if (spinner) {
                spinner.classList.add("d-none"); // Esconde o spinner
            }
            if (button) {
                button.removeAttribute("disabled"); // Habilita o botão
            }
            if (modal) {
                modal.show(); // Exibe o modal de sucesso do Bootstrap
            }
        }, 2000); // Simula um atraso de 2 segundos para o envio
    });
});