// Script para formulário com envio ao php
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

    // Regex para validar número de celular brasileiro comum (9 dígitos, opcional DDD e +55)
    const regexCelular = /^\+?(\d{2})?\s*(\(?\d{2}\)?)?\s*9?\s*\d{4}[-\s]?\d{4}$/;


    // --- Função de validação específica para o campo de celular ---
    function validateCelular() {
        if (!celularInput) return true;

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
                erroFeedback.remove(); // Remove mensagens de erro geradas
            }
        });
        // Resetar especificamente o erro do celular
        if (celularErrorSpan) {
            celularErrorSpan.style.display = 'none';
            celularErrorSpan.textContent = '';
        }
        celularInput.classList.remove('is-invalid');


        // 2. Validar campos vazios (incluindo o email que não estava explicitamente no PHP original, mas está no HTML)
        inputs.forEach((input) => {
            // Verifica se o campo é requerido (excluindo celular que tem validação própria)
            if (input.hasAttribute('required') && input.id !== 'celular') { 
                if (!input.value.trim()) {
                    valido = false;
                    input.classList.add("is-invalid"); // Adiciona classe de erro do Bootstrap

                    const msg = document.createElement("div");
                    msg.className = "invalid-feedback"; // Classe do Bootstrap para feedback de erro
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

        // Criar um FormData para enviar os dados
        const formData = new FormData(form);

        // Enviar os dados usando fetch API (ou $.ajax do jQuery)
        fetch(form.action, { // form.action é 'processar_formulario.php'
            method: form.method, // form.method é 'POST'
            body: formData,
        })
        .then(response => {
            // Verifica se a resposta HTTP é OK (2xx) ou se houve erro
            if (!response.ok) {
                // Se a resposta não for OK, lança um erro com a mensagem do backend
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Ocorreu um erro no servidor.');
                });
            }
            return response.json(); // Retorna os dados JSON da resposta
        })
        .then(data => {
            // Tratar a resposta JSON do PHP
            if (data.success) {
                form.reset(); // Limpa o formulário
                if (modal) {
                    modal.show(); // Exibe o modal de sucesso do Bootstrap
                }
            } else {
                // Se 'success' for falso na resposta JSON
                alert(data.message || 'Ocorreu um erro ao enviar a mensagem.');
            }
        })
        .catch(error => {
            // Tratar erros de rede ou erros lançados pelo .then(response => ...)
            console.error('Erro no envio do formulário:', error);
            alert('Falha ao enviar a mensagem: ' + error.message);
        })
        .finally(() => {
            // Esconder loading e habilitar botão, independentemente do sucesso ou falha
            if (spinner) {
                spinner.classList.add("d-none");
            }
            if (button) {
                button.removeAttribute("disabled");
            }
        });
    });
});