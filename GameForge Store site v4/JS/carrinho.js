class Carrinho {
    constructor() {
        this.carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        this.carrinhoDiv = document.getElementById('carrinho');
        this.totalDiv = document.getElementById('total');
        this.carregarCarrinho();
        this.configurarBotaoFinalizar();
    }

    atualizarLocalStorage() {
        localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    }

    carregarCarrinho() {
        this.carrinhoDiv.innerHTML = '';
        let total = 0;

        if (this.carrinho.length === 0) {
            this.carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
            this.totalDiv.innerText = '0.00';
            return;
        }

        this.carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            this.carrinhoDiv.innerHTML += `
                <div class="item">
                    <p>${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} = R$${subtotal.toFixed(2)}</p>
                    <button onclick="carrinho.alterarQuantidade(${index}, 1)">+</button>
                    <button onclick="carrinho.alterarQuantidade(${index}, -1)">-</button>
                    <button onclick="carrinho.removerDoCarrinho(${index})">Remover</button>
                </div>
            `;
        });

        this.totalDiv.innerText = total.toFixed(2);
    }

    alterarQuantidade(index, quantidade) {
        this.carrinho[index].quantidade += quantidade;

        if (this.carrinho[index].quantidade <= 0) {
            this.carrinho.splice(index, 1);
        }

        this.atualizarLocalStorage();
        this.carregarCarrinho();
    }

    removerDoCarrinho(index) {
        this.carrinho.splice(index, 1);
        this.atualizarLocalStorage();
        this.carregarCarrinho();
    }

    configurarBotaoFinalizar() {
        const botaoFinalizar = document.getElementById('finalizar');
        botaoFinalizar.addEventListener('click', () => {
            const total = parseFloat(this.totalDiv.innerText);
            if (total === 0) {
                alert("O carrinho está vazio. Adicione itens antes de finalizar a compra.");
                return;
            }
            alert(`Compra finalizada! Total: R$${total.toFixed(2)}`);
            localStorage.removeItem('carrinho');
            window.location.href = 'index.html';
        });
    }

    adicionarAoCarrinho(nome, preco) {
        const existente = this.carrinho.find(item => item.nome === nome);

        if (existente) {
            existente.quantidade += 1;
        } else {
            this.carrinho.push({ nome, preco, quantidade: 1 });
        }

        this.atualizarLocalStorage();
        this.carregarCarrinho();
    }
}

// Inicializa o carrinho
const carrinho = new Carrinho();