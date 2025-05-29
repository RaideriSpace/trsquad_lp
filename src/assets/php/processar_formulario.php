<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $nome = htmlspecialchars($_POST['nome']); // Use htmlspecialchars para segurança
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // Formata os dados para o arquivo TXT
    $dados = "Nome: " . $nome . "\n";
    $dados .= "Mensagem: " . $mensagem . "\n";
    $dados .= "Data/Hora: " . date("Y-m-d H:i:s") . "\n\n"; // Adiciona data e hora

    // Define o nome do arquivo TXT (pode ser dinâmico, ex: com timestamp)
    $nome_arquivo = "contatos.txt";

    // Adiciona os dados ao arquivo. FILE_APPEND adiciona ao final do arquivo.
    // LOCK_EX ajuda a evitar problemas de escrita se muitos envios simultâneos.
    if (file_put_contents($nome_arquivo, $dados, FILE_APPEND | LOCK_EX) !== false) {
        // Sucesso: Redireciona para uma página de sucesso ou exibe uma mensagem
        header("Location: obrigado.html"); // Redireciona para uma página de "obrigado"
        exit();
    } else {
        // Erro ao escrever no arquivo
        echo "Erro ao salvar os dados. Por favor, tente novamente.";
    }
} else {
    // Se o formulário não foi enviado via POST, redireciona ou exibe erro
    header("Location: index.html"); // Redireciona de volta para o formulário
    exit();
}
?>