class Carrinho {
    constructor() {
        // Inicializa o carrinho com itens do localStorage ou um array vazio
        this.carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        this.carrinhoDiv = document.getElementById('carrinho'); // Div para exibir os itens do carrinho
        this.totalDiv = document.getElementById('total'); // Div para exibir o valor total
        this.carregarCarrinho(); // Carrega os itens na tela
        this.configurarBotaoFinalizar(); // Configura o botão "Finalizar Compra"
    }

    atualizarLocalStorage() {
        // Atualiza o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    }

    carregarCarrinho() {
        // Limpa o conteúdo atual da div do carrinho
        this.carrinhoDiv.innerHTML = '';
        let total = 0;

        // Verifica se o carrinho está vazio
        if (this.carrinho.length === 0) {
            this.carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>'; // Mensagem de carrinho vazio
            this.totalDiv.innerText = '0.00'; // Total é zero
            return;
        }

        // Percorre os itens do carrinho
        this.carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade; // Calcula o subtotal para o item
            total += subtotal; // Adiciona ao total

            // Adiciona o HTML do item ao carrinho
            this.carrinhoDiv.innerHTML += `
                <div class="item">
                    <p>${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} = R$${subtotal.toFixed(2)}</p>
                    <button onclick="carrinho.alterarQuantidade(${index}, 1)">+</button> <!-- Aumenta a quantidade -->
                    <button onclick="carrinho.alterarQuantidade(${index}, -1)">-</button> <!-- Diminui a quantidade -->
                    <button onclick="carrinho.removerDoCarrinho(${index})">Remover</button> <!-- Remove o item -->
                </div>
            `;
        });

        // Atualiza o valor total na tela
        this.totalDiv.innerText = total.toFixed(2);
    }

    alterarQuantidade(index, quantidade) {
        // Altera a quantidade de um item no carrinho
        this.carrinho[index].quantidade += quantidade;

        // Remove o item se a quantidade for zero ou menor
        if (this.carrinho[index].quantidade <= 0) {
            this.carrinho.splice(index, 1); // Remove o item do array
        }

        this.atualizarLocalStorage(); // Atualiza os dados no localStorage
        this.carregarCarrinho(); // Atualiza o carrinho na tela
    }

    removerDoCarrinho(index) {
        // Remove um item do carrinho pelo índice
        this.carrinho.splice(index, 1); // Remove o item do array
        this.atualizarLocalStorage(); // Atualiza os dados no localStorage
        this.carregarCarrinho(); // Atualiza o carrinho na tela
    }

    configurarBotaoFinalizar() {
        // Configura o botão "Finalizar Compra"
        const botaoFinalizar = document.getElementById('finalizar');
        botaoFinalizar.addEventListener('click', () => {
            const total = parseFloat(this.totalDiv.innerText); // Obtém o valor total do carrinho
            if (total === 0) {
                alert("O carrinho está vazio. Adicione itens antes de finalizar a compra."); // Alerta se o carrinho estiver vazio
                return;
            }
            // Mensagem de sucesso e redirecionamento
            alert(`Compra finalizada! Total: R$${total.toFixed(2)}`);
            localStorage.removeItem('carrinho'); // Limpa o carrinho do localStorage
            window.location.href = 'index.html'; // Redireciona para a página inicial
        });
    }

    adicionarAoCarrinho(nome, preco) {
        // Adiciona um item ao carrinho
        const existente = this.carrinho.find(item => item.nome === nome); // Verifica se o item já está no carrinho

        if (existente) {
            existente.quantidade += 1; // Aumenta a quantidade do item existente
        } else {
            this.carrinho.push({ nome, preco, quantidade: 1 }); // Adiciona um novo item ao carrinho
        }

        this.atualizarLocalStorage(); // Atualiza os dados no localStorage
        this.carregarCarrinho(); // Atualiza o carrinho na tela
    }
}

// Inicializa o carrinho ao carregar a página
const carrinho = new Carrinho();
