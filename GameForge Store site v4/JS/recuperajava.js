// Função de validação para o campo de email
function validarEmail() {
    const email = document.getElementById('email').value;
    const erroEmail = document.getElementById('erro-email');
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!regex.test(email)) {
        erroEmail.textContent = "Por favor, insira um e-mail válido.";
        erroEmail.style.display = "block";
        return false;
    }
    
    erroEmail.style.display = "none";
    return true;
}

// Função principal de recuperação de senha
function recuperarSenha(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const emailValido = validarEmail();

    if (emailValido) {
        // Simulação de recuperação de senha bem-sucedida
        alert("Se o e-mail informado existir no sistema, você receberá um link para recuperar a senha.");
        // Aqui você pode adicionar a lógica para enviar o e-mail para o servidor
    } else {
        alert("Por favor, corrija os erros e tente novamente.");
    }
}
