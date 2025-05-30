<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    // Adicionando email e celular, que estão no frontend mas não no PHP original
    $nome = htmlspecialchars($_POST['nome'] ?? ''); // Use ?? '' para evitar erro se o campo não existir
    $email = htmlspecialchars($_POST['email'] ?? '');
    $celular = htmlspecialchars($_POST['celular'] ?? '');
    $mensagem = htmlspecialchars($_POST['mensagem'] ?? '');

    // Verifica se os campos obrigatórios estão preenchidos (validação básica no backend)
    if (empty($nome) || empty($email) || empty($celular) || empty($mensagem)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        exit();
    }

    // Formata os dados para o arquivo TXT
    $dados = "Nome: " . $nome . "\n";
    $dados .= "Email: " . $email . "\n"; // Adicionado
    $dados .= "Celular: " . $celular . "\n"; // Adicionado
    $dados .= "Mensagem: " . $mensagem . "\n";
    $dados .= "Data/Hora: " . date("Y-m-d H:i:s") . "\n\n"; // Adiciona data e hora

    // Define o nome do arquivo TXT (pode ser dinâmico, ex: com timestamp)
    $nome_arquivo = "contatos.txt";

    // Adiciona os dados ao arquivo. FILE_APPEND adiciona ao final do arquivo.
    // LOCK_EX ajuda a evitar problemas de escrita se muitos envios simultâneos.
    if (file_put_contents($nome_arquivo, $dados, FILE_APPEND | LOCK_EX) !== false) {
        // Sucesso: Envia uma resposta JSON de sucesso
        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);
        exit();
    } else {
        // Erro ao escrever no arquivo
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar os dados. Por favor, tente novamente.']);
        exit();
    }
} else {
    // Se o formulário não foi enviado via POST, responde com erro
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Método de requisição não permitido.']);
    exit();
}
?>