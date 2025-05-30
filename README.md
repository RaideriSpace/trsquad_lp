# TR Squad - Tecnologia Renovada

Bem-vindo ao repositório oficial da TR Squad, sua parceira em soluções de TI inovadoras e suporte técnico instantâneo! Este projeto representa o site institucional da TR Squad, desenvolvido para apresentar nossos diferenciais, serviços e canais de contato.

**Este é um projeto pessoal de re-design e reprogramação de um site já existente.** Meu objetivo com este trabalho foi explorar e aprimorar meus conhecimentos em desenvolvimento web, aplicando as melhores práticas de design e programação para recriar e otimizar a experiência do usuário.

## Visão Geral

A TR Squad oferece suporte técnico ágil e personalizado, consultoria avançada, segurança cibernética com Firewalls de última geração, VPNs e redes seguras, instalação de softwares e mapeamento de soluções. Nosso objetivo é transformar desafios tecnológicos em oportunidades de crescimento, impulsionando seu negócio para o futuro.

## Estrutura do Projeto

O projeto segue uma estrutura de pastas organizada para facilitar a manutenção e o desenvolvimento:


    .
    ├── src/
    │   ├── assets/             # Imagens e icones
    │   │   ├── icons/
    │   │   └── img/
    │   ├── script/           # Scripts js utilizados no site para animações e efeitos
    │   │   ├── carousel.js            (Lógica para o carrossel de avaliações)
    │   │   ├── effects.js             (Efeitos visuais como parallax e animações de scroll)
    │   │   ├── formHandler_local.js   (Simulação de envio de formulário para desenvolvimento local)
    │   │   └── formHandler_php.js     (Lógica de envio de formulário via PHP para ambiente real)
    │   ├── styles/               # folha de estilo CSS
    │   │   └── style.css
    ├── .gitignore                 # Arquivos e pastas a serem ignorados pelo Git
    ├── index.html                 # Arquivo HTML principal
    ├── processar_formulario.php   # Script PHP para processamento do formulário de contato
    └── README.md                  # Este arquivo!
    

## Tecnologias Utilizadas

* **HTML5**: Estrutura semântica da página.
* **CSS3**: Estilização e responsividade, incluindo o uso de Media Queries.
* **JavaScript (ES6+)**: Interatividade e dinamismo na interface do usuário.
* **jQuery**: Utilizado em `effects.js` para manipulação do DOM e animações.
* **Bootstrap 5.3**: Framework CSS para layout responsivo e componentes pré-estilizados.
* **Font Awesome 6.5**: Biblioteca de ícones.
* **Animate.css**: Biblioteca de animações CSS para efeitos de entrada.
* **PHP**: Para o processamento do formulário de contato (`processar_formulario.php`).

## Funcionalidades

* **Navegação Responsiva**: A navbar se adapta a diferentes tamanhos de tela.
* **Seção Hero**: Apresenta a proposta de valor da TR Squad.
* **Seção de Diferenciais**: Destaca os pontos fortes da empresa com efeitos de animação ao rolar a página.
* **Efeito Parallax**: Uma imagem central que se move em relação ao scroll da página, adicionando profundidade visual.
* **Seção de Serviços**: Detalha os principais serviços oferecidos.
* **Carrossel de Avaliações**: Exibe depoimentos ou banners de forma dinâmica, com contagem de slides e adaptação de imagens para mobile/desktop.
* **Seção "TR Squad em Destaque"**: Uma seção em vermelho que reforça a missão e a abordagem da empresa.
* **Seção "Quem Somos"**: Apresenta a TR Squad de forma mais detalhada.
* **Seção de Contato**:
    * Links diretos para WhatsApp e Instagram.
    * Formulário de contato com validação em tempo real (nome/empresa, e-mail, celular e mensagem).
    * Validação específica para o formato do número de celular brasileiro.
    * Animação de loading no botão de envio.
    * Exibição de um modal de sucesso após o envio.
    * **Suporte para dois modos de envio de formulário:**
        * **Local (`formHandler_local.js`):** Simula o envio do formulário com um atraso, ideal para testes de frontend sem a necessidade de um servidor PHP.
        * **Produção (`formHandler_php.js`):** Envia os dados para o script PHP (`processar_formulario.php`) no backend.
* **Rodapé**: Informações de direitos autorais e link para a política de privacidade.

## Como Executar o Projeto Localmente

Para rodar este projeto em seu ambiente local, siga os passos abaixo:

1.  **Clone o Repositório**:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```
    (Substitua `seu-usuario/seu-repositorio.git` pelo caminho real do seu repositório).

2.  **Configuração do Servidor Web (para PHP)**:
    Se você pretende testar o envio do formulário via PHP (usando `formHandler_php.js`), você precisará de um servidor web com suporte a PHP (como Apache, Nginx com PHP-FPM, ou XAMPP/WAMP/MAMP para desenvolvimento local).

    * **Com XAMPP/WAMP/MAMP**:
        * Instale um desses pacotes.
        * Mova a pasta `seu-repositorio` para o diretório `htdocs` (XAMPP/WAMP) ou `www` (MAMP).
        * Inicie os serviços do Apache e MySQL (se aplicável, embora o MySQL não seja usado neste projeto).
        * Acesse o projeto pelo seu navegador, geralmente em `http://localhost/seu-repositorio/`.

    * **Servidor Web Manual (Apache/Nginx)**:
        * Configure um host virtual para apontar para a pasta `seu-repositorio`.
        * Certifique-se de que o PHP está instalado e configurado corretamente.

3.  **Acessar o Site**:
    Após configurar o servidor, abra seu navegador e navegue até o `index.html` do projeto (ex: `http://localhost/seu-repositorio/index.html`).

4.  **Alternando o Comportamento do Formulário**:
    No `index.html`, você pode escolher qual script de `formHandler` será carregado:

    ```html
    <script src="./src/script/formHandler_local.js"></script>

    ```
    Basta comentar ou descomentar a linha desejada. Por padrão, o `formHandler_php.js` deve estar ativo para o ambiente de produção.

## Uso do Formulário de Contato

* **`formHandler_local.js`**: Este script simula o envio do formulário. Ele realiza as validações do frontend e, após um breve atraso, limpa o formulário e exibe o modal de sucesso. **Nenhum dado é enviado para o servidor** neste modo. É ideal para desenvolvimento e testes rápidos da interface do usuário.

* **`formHandler_php.js`**: Este script envia os dados do formulário para `processar_formulario.php` via requisição assíncrona (Fetch API).

    O `processar_formulario.php` tem a funcionalidade de:
    * Receber os dados do formulário via método POST.
    * Sanitizar os dados de `nome`, `email`, `celular` e `mensagem` com `htmlspecialchars` para prevenir ataques XSS.
    * Registrar os dados (nome, email, celular, mensagem, data/hora) em um arquivo de texto chamado `contatos.txt` na raiz do projeto.
    * Enviar uma resposta JSON para o frontend, indicando sucesso ou falha no processamento.

    **Nota**: Em um ambiente de produção, é altamente recomendável que o envio de formulários seja tratado de forma mais robusta, incluindo:
    * Validação de dados mais abrangente no lado do servidor.
    * Armazenamento dos dados em um banco de dados.
    * Envio de e-mails para a equipe responsável.
    * Implementação de medidas anti-spam (ex: reCAPTCHA).

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar algum bug, por favor, abra uma issue ou envie um pull request.

## Licença

Este projeto não possui uma licença definida e, por padrão, todos os direitos são reservados ao autor.

---

**TR Squad - Tecnologia Renovada**
_Sua solução tecnológica, sempre ao seu lado._
