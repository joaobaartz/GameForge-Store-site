import tkinter as tk
from tkinter import messagebox
import os

class SistemaLogin:
    def __init__(self, arquivo_usuarios="usuarios.txt"):
        self.arquivo_usuarios = arquivo_usuarios
        self.usuarios = self.carregar_usuarios()
        self.janela = tk.Tk()
        self.janela.title("Login")
        self.janela.geometry("400x300")
        self.janela.configure(bg="#6dff4f")
        self.criar_interface()

    def carregar_usuarios(self):
        if not os.path.exists(self.arquivo_usuarios):
            with open(self.arquivo_usuarios, "w") as f:
                f.write("Tiago:123\nadmin:1234\n")  # Usuários padrão
        usuarios = {}
        with open(self.arquivo_usuarios, "r") as f:
            for linha in f:
                dados = linha.strip().split(":")
                if len(dados) == 2:
                    usuario, senha = dados
                    usuarios[usuario] = senha
        return usuarios

    def salvar_usuario(self, usuario, senha):
        with open(self.arquivo_usuarios, "a") as f:
            f.write(f"{usuario}:{senha}\n")

    def verificar_login(self):
        usuario = self.entry_usuario.get()
        senha = self.entry_senha.get()
        
        if usuario in self.usuarios and self.usuarios[usuario] == senha:
            if usuario == "Tiago":
                messagebox.showinfo("Login", "Bem-vindo, administrador Tiago!")
            else:
                messagebox.showinfo("Login", f"Bem-vindo, {usuario}!")
        else:
            messagebox.showerror("Erro", "Usuário ou senha incorretos!")

    def criar_conta(self):
        novo_usuario = self.entry_novo_usuario.get()
        nova_senha = self.entry_nova_senha.get()
        
        if novo_usuario in self.usuarios:
            messagebox.showerror("Erro", "Usuário já existe!")
        elif not novo_usuario or not nova_senha:
            messagebox.showerror("Erro", "Usuário e senha não podem estar vazios!")
        else:
            self.usuarios[novo_usuario] = nova_senha
            self.salvar_usuario(novo_usuario, nova_senha)
            messagebox.showinfo("Sucesso", f"Conta criada para o usuário {novo_usuario}!")
            self.criar_conta_janela.destroy()

    def abrir_criar_conta(self):
        self.criar_conta_janela = tk.Toplevel(self.janela)
        self.criar_conta_janela.title("Criar Conta")
        self.criar_conta_janela.geometry("300x200")
        self.criar_conta_janela.configure(bg="#6dff4f")
        
        tk.Label(
            self.criar_conta_janela, 
            text="Novo Usuário:", 
            font=("Arial", 12), 
            fg="#2C3E50", 
            bg="#6dff4f"
        ).pack(pady=10)
        self.entry_novo_usuario = tk.Entry(self.criar_conta_janela, font=("Arial", 12), width=25)
        self.entry_novo_usuario.pack(pady=5)

        tk.Label(
            self.criar_conta_janela, 
            text="Nova Senha:", 
            font=("Arial", 12), 
            fg="#2C3E50", 
            bg="#6dff4f"
        ).pack(pady=10)
        self.entry_nova_senha = tk.Entry(self.criar_conta_janela, font=("Arial", 12), width=25, show="*")
        self.entry_nova_senha.pack(pady=5)

        tk.Button(
            self.criar_conta_janela, 
            text="Criar Conta", 
            font=("Arial", 12, "bold"), 
            fg="#2C3E50", 
            bg="#16A085", 
            activebackground="#1ABC9C", 
            activeforeground="#ECF0F1", 
            relief=tk.FLAT, 
            command=self.criar_conta
        ).pack(pady=20)

    def criar_interface(self):
        # Título
        tk.Label(
            self.janela,
            text="Faça login e entre para o nosso time GameForge Store",
            font=("Arial", 20, "bold"),
            fg="#2C3E50",
            bg="#6dff4f"
        ).pack(pady=20)

        # Entrada de usuário
        frame_usuario = tk.Frame(self.janela, bg="#6dff4f")
        frame_usuario.pack(pady=10)
        tk.Label(
            frame_usuario,
            text="Usuário:",
            font=("Arial", 12),
            fg="#2C3E50",
            bg="#6dff4f"
        ).pack(side=tk.LEFT, padx=5)
        self.entry_usuario = tk.Entry(frame_usuario, font=("Arial", 12), width=25, bd=2, relief=tk.GROOVE)
        self.entry_usuario.pack(side=tk.LEFT)

        # Entrada de senha
        frame_senha = tk.Frame(self.janela, bg="#6dff4f")
        frame_senha.pack(pady=10)
        tk.Label(
            frame_senha,
            text="Senha:",
            font=("Arial", 12),
            fg="#2C3E50",
            bg="#6dff4f"
        ).pack(side=tk.LEFT, padx=5)
        self.entry_senha = tk.Entry(frame_senha, font=("Arial", 12), width=25, bd=2, relief=tk.GROOVE, show="*")
        self.entry_senha.pack(side=tk.LEFT)

        # Botões
        tk.Button(
            self.janela,
            text="Login",
            font=("Arial", 12, "bold"),
            fg="#2C3E50",
            bg="#16A085",
            activebackground="#1ABC9C",
            activeforeground="#ECF0F1",
            relief=tk.FLAT,
            width=15,
            command=self.verificar_login
        ).pack(pady=10)

        tk.Button(
            self.janela,
            text="Criar Conta",
            font=("Arial", 12, "bold"),
            fg="#2C3E50",
            bg="#2980B9",
            activebackground="#3498DB",
            activeforeground="#ECF0F1",
            relief=tk.FLAT,
            width=15,
            command=self.abrir_criar_conta
        ).pack(pady=10)

        # Rodapé
        tk.Label(
            self.janela,
            text="© 2024 Game Forge Store",
            font=("Arial", 10),
            fg="#2C3E50",
            bg="#6dff4f"
        ).pack(side=tk.BOTTOM, pady=10)

    def executar(self):
        self.janela.mainloop()


# Inicializa o sistema de login
sistema = SistemaLogin()
sistema.executar()
