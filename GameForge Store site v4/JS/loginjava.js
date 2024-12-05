document.addEventListener('DOMContentLoaded', function() {
    const btnLogin = document.querySelector('.btn-login');
    
    // Função para validar os campos do formulário
    function validarLogin() {
        const usuario = document.querySelector('[name="usuario"]');
        const senha = document.querySelector('[name="senha"]');
        
        if (!usuario.value || !senha.value) {
            alert("Por favor, preencha todos os campos!");
            return false;
        }
        
        // Se tudo estiver ok, simula o login (poderia ser feito um POST aqui)
        alert("Login realizado com sucesso!");
        return true;
    }

    // Adiciona o evento de click no botão
    btnLogin.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o envio do formulário padrão
        if (validarLogin()) {
            // Aqui, normalmente você faria uma requisição para o backend
            window.location.href = 'home.html'; // Redirecionamento para a página principal após login
        }
    });
});
