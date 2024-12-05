// Função de validação para os campos do cadastro
function validarUsuario() {
    const usuario = document.getElementById('usuario').value;
    const erroUsuario = document.getElementById('erro-usuario');
    if (usuario.length < 3) {
        erroUsuario.textContent = "O nome de usuário deve ter no mínimo 3 caracteres.";
        erroUsuario.style.display = "block";
        erroUsuario.style.color = "red";  
        return false;
    }
    erroUsuario.style.display = "none";
    return true;
}

function validarEmail() {
    const email = document.getElementById('email').value;
    const erroEmail = document.getElementById('erro-email');
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        erroEmail.textContent = "Por favor, insira um e-mail válido.";
        erroEmail.style.display = "block";
        erroEmail.style.color = "red";  
        return false;
    }
    erroEmail.style.display = "none";
    return true;
}

function validarSenha() {
    const senha = document.getElementById('senha').value;
    const erroSenha = document.getElementById('erro-senha');
    if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres.";
        erroSenha.style.display = "block";
        erroSenha.style.color = "red";  
        return false;
    }
    erroSenha.style.display = "none";
    return true;
}

function validarConfirmarSenha() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const erroConfirmarSenha = document.getElementById('erro-confirmar-senha');
    if (senha !== confirmarSenha) {
        erroConfirmarSenha.textContent = "As senhas não coincidem.";
        erroConfirmarSenha.style.display = "block";
        erroConfirmarSenha.style.color = "red";  
        return false;
    }
    erroConfirmarSenha.style.display = "none";
    return true;
}

// Função principal de validação no envio do formulário
function cadastrar(event) {
    event.preventDefault(); 
    const usuarioValido = validarUsuario();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    const confirmarSenhaValida = validarConfirmarSenha();

    if (usuarioValido && emailValido && senhaValida && confirmarSenhaValida) {
  
        alert("Cadastro realizado com sucesso!");

    } else {
        alert("Por favor, corrija os erros e tente novamente.");
    }
}
