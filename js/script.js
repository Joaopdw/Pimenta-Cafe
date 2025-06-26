// ========================
// MENU LATERAL
// ========================
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  if (menu) menu.classList.toggle('open');
}

// ========================
// LOGIN
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('password').value;

      if (email === 'teste@pimenta.com' && senha === '1234') {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
      } else {
        alert('Email ou senha incorretos.');
      }
    });
  }
});

// ========================
// CHAT
// ========================
function enviarMensagem(event) {
  event.preventDefault();
  const input = document.getElementById('mensagem');
  const msg = input.value.trim();
  if (!msg) return;

  const chatBox = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.classList.add('msg', 'sent');
  div.innerHTML = `<p>${msg}</p><span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
  chatBox.appendChild(div);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const resposta = document.createElement('div');
    resposta.classList.add('msg', 'received');
    resposta.innerHTML = `<p>Obrigado por sua mensagem! Em breve responderemos.</p><span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
    chatBox.appendChild(resposta);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

const chatForm = document.getElementById('form-chat');
if (chatForm) {
  chatForm.addEventListener('submit', enviarMensagem);
}

// ========================
// DETALHES DO PRODUTO
// ========================
const detalhesContainer = document.getElementById('detalhes-container');
if (detalhesContainer) {
  const produto = JSON.parse(localStorage.getItem('produtoSelecionado'));
  if (!produto) {
    detalhesContainer.innerHTML = '<p>Produto não encontrado.</p>';
  } else {
    detalhesContainer.innerHTML = `
      <div class="produto-detalhe col center">
        <img src="${produto.imagem}" alt="${produto.nome}" style="max-width:300px; border-radius:12px;">
        <h1>${produto.nome}</h1>
        <p>${produto.descricao}</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <div class="row" style="align-items: center; gap: 1rem">
          <button onclick="alterarQtd(-1)">-</button>
          <span id="quantidade">1</span>
          <button onclick="alterarQtd(1)">+</button>
        </div>
        <button style="margin-top: 1rem;" onclick="adicionarCarrinho()">Adicionar ao carrinho</button>
      </div>`;
  }
}

function alterarQtd(delta) {
  const qtdSpan = document.getElementById('quantidade');
  let qtd = parseInt(qtdSpan.textContent);
  qtd = Math.max(1, qtd + delta);
  qtdSpan.textContent = qtd;
}

function adicionarCarrinho() {
  const produto = JSON.parse(localStorage.getItem('produtoSelecionado'));
  const qtd = parseInt(document.getElementById('quantidade').textContent);
  const item = { ...produto, quantidade: qtd };
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(item);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
}

function verDetalhes(nome, descricao, preco, imagem) {
  const produto = { nome, descricao, preco, imagem };
  localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
  window.location.href = '/screens/detalhes.html';
}

// ========================
// CONTA - Edição e Saída
// ========================
const editarBtn = document.getElementById('btn-editar');
if (editarBtn) {
  editarBtn.addEventListener('click', () => {
    alert('Redirecionando para edição...');
    window.location.href = 'editar-conta.html';
  });
}

const sairBtn = document.getElementById('btn-sair');
if (sairBtn) {
  sairBtn.addEventListener('click', () => {
    if (confirm('Deseja realmente sair da conta?')) {
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'login.html';
    }
  });
}

// ========================
// CARTEIRA
// ========================
function adicionarCartao() {
  const lista = document.getElementById('lista-cartoes');
  const final = Math.floor(1000 + Math.random() * 9000);
  const index = lista.children.length + 1;
  const div = document.createElement('div');
  div.className = 'cartao';
  div.innerHTML = `
    <img src="https://img.icons8.com/color/48/000000/bank-card-front-side.png" alt="cartão">
    <div>Cartão ${index}<br><small>**** ${final}</small></div>
    <div class="card-actions">
      <button class="btn-sm btn-principal" onclick="definirPrincipal(this)">Principal</button>
      <button class="btn-sm" onclick="editarCartao(this)">Editar</button>
      <button class="btn-sm" onclick="excluirCartao(this)">Excluir</button>
    </div>`;
  lista.appendChild(div);
}

function excluirCartao(botao) {
  const cartao = botao.closest('.cartao');
  cartao.remove();
}

function editarCartao(botao) {
  const nome = prompt('Digite o novo nome do cartão:');
  if (nome) {
    const div = botao.closest('.cartao').querySelector('div:nth-child(2)');
    const numero = div.querySelector('small').textContent;
    div.innerHTML = `<strong>${nome}</strong><br><small>${numero}</small>`;
  }
}

function definirPrincipal(botao) {
  document.querySelectorAll('.card-actions button').forEach(btn => {
    btn.classList.remove('btn-principal');
  });
  botao.classList.add('btn-principal');
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-macarrao');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const massa = form.querySelector('input[name="massa"]:checked');
      const molho = form.querySelector('input[name="molho"]:checked');
      const ingredientes = [...form.querySelectorAll('input[name="ingredientes"]:checked')];
      const bebidas = [...form.querySelectorAll('input[name="bebidas"]:checked')];

      if (!massa || !molho || ingredientes.length === 0) {
        alert("Por favor, selecione uma massa, um molho (ou 'Sem molho') e pelo menos um ingrediente.");
        return;
      }

      let total = 0;

      // Preços fixos
      total += 13.00; // Massa

      if (molho.value !== 'Sem molho') {
        total += 2.00;
      }

      total += ingredientes.length * 2.00;
      total += bebidas.length * 5.00;

      const pedido = {
        tipo: "Macarrão Personalizado",
        descricao: `${massa.value} com molho ${molho.value}`,
        massa: massa.value,
        molho: molho.value,
        ingredientes: ingredientes.map(i => i.value),
        bebidas: bebidas.map(b => b.value),
        preco: total.toFixed(2)
      };

      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(pedido);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      alert("Seu macarrão foi adicionado ao carrinho!");
      window.location.href = 'carrinho.html';
    });
  }

  // VISUALIZAÇÃO DO CARRINHO
  const carrinhoContainer = document.getElementById('carrinho-lista');
  if (carrinhoContainer) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
      let total = 0;
      carrinho.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        const ingredientes = item.ingredientes ? item.ingredientes.join(', ') : '';
        const bebidas = item.bebidas && item.bebidas.length ? `<br><strong>Bebidas:</strong> ${item.bebidas.join(', ')}` : '';

        div.innerHTML = `
          <div class="info">
            <strong>${item.tipo}</strong>
            <div class="comentario">${item.descricao}<br><strong>Ingredientes:</strong> ${ingredientes}${bebidas}</div>
          </div>
          <div class="controles">
            <span>R$${item.preco}</span>
            <button class="btn-sm btn-outline" data-index="${index}">Remover</button>
          </div>`;
        carrinhoContainer.appendChild(div);
        total += parseFloat(item.preco);
      });
      const totalDiv = document.querySelector('.total');
      if (totalDiv) {
        totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
      }

      // Ação de remover
      carrinhoContainer.addEventListener('click', (e) => {
        if (e.target.matches('button[data-index]')) {
          const index = parseInt(e.target.dataset.index);
          carrinho.splice(index, 1);
          localStorage.setItem('carrinho', JSON.stringify(carrinho));
          location.reload();
        }
      });
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('btn-sortear');
  const resultado = document.getElementById('resultado');

  const pratos = [
    {
      nome: "Cuscuz de carne seca",
      descricao: "Massa leve de milho com recheio suculento de carne seca",
      preco: 10.00,
      imagem: "../img/cuzcuzdeCarne.png"
    },
    {
      nome: "Pão com ovos e manteiga",
      descricao: "Tradicional, saboroso e preparado na hora",
      preco: 6.00,
      imagem: "../img/paocomovo.png"
    },
    {
      nome: "Bolo de Ninho",
      descricao: "Doce artesanal com leite ninho e cobertura especial",
      preco: 12.00,
      imagem: "../img/Bolo.png"
    },
    {
      nome: "Combo Natural",
      descricao: "Salada de frutas, sanduíche natural e suco",
      preco: 22.00,
      imagem: "../img/sucoesanduichenatu.png"
    },
    {
      nome: "Tapioca de Frango",
      descricao: "Tapioca recheada com frango desfiado e queijo",
      preco: 15.00,
      imagem: "../img/tapiocaFrango.png"
    },
    {
      nome: "Bife de carne acebolado",
      descricao: "Bife grelhado com cebolas caramelizadas",
      preco: 18.00,
      imagem: "../img/bifeacebolado.png"
    }
  ];

  botao.addEventListener('click', () => {
    const escolhido = pratos[Math.floor(Math.random() * pratos.length)];

    resultado.innerHTML = `
      <div class="card" style="flex-direction: column; text-align: center">
        <img src="${escolhido.imagem}" alt="${escolhido.nome}" style="width:200px; border-radius:12px">
        <h2>${escolhido.nome}</h2>
        <p>${escolhido.descricao}</p>
        <p class="preco">R$ ${escolhido.preco.toFixed(2)}</p>
        <button class="btn btn-primary" onclick='adicionarSurpresa(${JSON.stringify(escolhido)})'>Adicionar ao Carrinho</button>
      </div>
    `;
  });
});

function adicionarSurpresa(prato) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const item = {
    tipo: "Surpresa",
    descricao: prato.nome,
    preco: prato.preco.toFixed(2)
  };
  carrinho.push(item);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert("Prato surpresa adicionado ao carrinho!");
  window.location.href = 'carrinho.html';
}