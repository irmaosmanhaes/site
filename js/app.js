const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const POR_PAGINA = 48;

const LOGO = `<svg viewBox="0 0 54 36" aria-hidden="true"><path d="M2 20 L27 4 L52 20 L52 25 L27 10 L2 25Z" fill="#e5392a"/><rect x="38" y="3" width="6" height="9" fill="#e5392a"/></svg>`;

function cabecalho() {
  document.getElementById('topo').innerHTML = `<div class="in">
    <a class="logo" href="index.html"><img src="img/logo.webp" alt="Irmãos Manhães"><div><span>IRMÃOS MANHÃES</span><small>Tudo para sua reforma, casa ou negócio</small></div></a>
    <nav><a href="index.html">Catálogo</a><a href="https://www.instagram.com/irmaosmanhaes/" target="_blank" rel="noopener">Instagram</a></nav></div>`;
  document.getElementById('rodape').innerHTML = `<div class="in">
    <div><strong>Irmãos Manhães</strong><br>40+ anos de confiança e tradição<br>Alcântara - São Gonçalo/RJ</div>
    <div>Compra 100% segura pelo Mercado Livre.<br>Ao clicar em comprar você é levado ao anúncio oficial.</div>
    <div><a href="https://www.instagram.com/irmaosmanhaes/" target="_blank" rel="noopener">@irmaosmanhaes</a><br><a href="https://linktr.ee/irmaosmanhaes" target="_blank" rel="noopener">Fale conosco</a></div></div>`;
}

async function carregar() {
  const r = await fetch('data/produtos.json');
  return r.json();
}

const imgHtml = (p, i = 0) => p.imagens && p.imagens[i]
  ? `<img src="${esc(p.imagens[i])}" alt="${esc(p.nome)}" loading="lazy" referrerpolicy="no-referrer">` : 'Sem foto';

const desconto = p => p.precoAntigo && p.precoAntigo > p.preco ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;

function cardHtml(p) {
  const d = desconto(p);
  return `<a class="card" href="produto.html?id=${encodeURIComponent(p.id)}">
    <div class="img">${imgHtml(p)}</div>
    <div class="info"><span class="cat">${esc(p.marca || p.categoria)}</span>
    <span class="nome">${esc(p.nome)}</span>
    ${d ? `<span class="antigo">${brl(p.precoAntigo)}</span>` : ''}
    <span class="preco">${brl(p.preco)}${d ? `<span class="off">${d}% OFF</span>` : ''}</span></div></a>`;
}

async function iniciarCatalogo() {
  cabecalho();
  const { produtos } = await carregar();
  const grade = document.getElementById('grade');
  const busca = document.getElementById('busca');
  const ordem = document.getElementById('ordem');
  const chips = document.getElementById('chips');
  const cont = document.getElementById('cont');
  const mais = document.getElementById('mais');
  const contagem = {};
  produtos.forEach(p => contagem[p.categoria] = (contagem[p.categoria] || 0) + 1);
  const cats = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);
  let cat = new URLSearchParams(location.search).get('cat') || '';
  let limite = POR_PAGINA;

  chips.innerHTML = ['', ...cats].map(c =>
    `<button class="chip" data-c="${esc(c)}">${c ? esc(c) + ' (' + contagem[c] + ')' : 'Todos (' + produtos.length + ')'}</button>`).join('');
  const render = () => {
    chips.querySelectorAll('.chip').forEach(b => b.classList.toggle('on', b.dataset.c === cat));
    const q = norm(busca.value);
    let lista = produtos.filter(p => (!cat || p.categoria === cat) && norm(p.nome + ' ' + p.marca + ' ' + p.categoria).includes(q));
    if (ordem.value === 'menor') lista.sort((a, b) => a.preco - b.preco);
    if (ordem.value === 'maior') lista.sort((a, b) => b.preco - a.preco);
    if (ordem.value === 'nome') lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    cont.textContent = lista.length + ' produto(s)';
    grade.innerHTML = lista.length ? lista.slice(0, limite).map(cardHtml).join('') : '<p>Nenhum produto encontrado.</p>';
    mais.style.display = lista.length > limite ? '' : 'none';
  };
  chips.onclick = e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.c; limite = POR_PAGINA; render(); } };
  busca.oninput = ordem.onchange = () => { limite = POR_PAGINA; render(); };
  mais.onclick = () => { limite += POR_PAGINA; render(); };
  render();
}

async function iniciarProduto() {
  cabecalho();
  const id = new URLSearchParams(location.search).get('id');
  const { produtos } = await carregar();
  const p = produtos.find(x => x.id === id);
  const el = document.getElementById('produto');
  if (!p) { el.innerHTML = '<p>Produto não encontrado. <a href="index.html">Voltar</a></p>'; return; }
  document.title = p.nome + ' - Irmãos Manhães';
  const d = desconto(p);
  const rel = produtos.filter(x => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
  el.innerHTML = `<div><div class="img">${imgHtml(p)}</div></div>
    <div><span class="cat">${esc(p.categoria)}${p.marca ? ' · ' + esc(p.marca) : ''}</span><h1>${esc(p.nome)}</h1>
    ${d ? `<div class="antigo" style="margin:0">${brl(p.precoAntigo)}</div>` : ''}
    <div class="preco">${brl(p.preco)}${d ? `<span class="off">${d}% OFF</span>` : ''}</div>
    <div class="acoes"><a class="btn" href="${esc(p.linkMercadoLivre)}" target="_blank" rel="noopener">Comprar no Mercado Livre</a>
    <a class="btn sec" href="index.html?cat=${encodeURIComponent(p.categoria)}">Ver mais em ${esc(p.categoria)}</a></div>
    <div class="selos">✔ Compra protegida pelo Mercado Livre<br>✔ Vendido por Irmãos Manhães<br>ℹ Preço e estoque confirmados no anúncio</div></div>`;
  if (rel.length) document.getElementById('rel').innerHTML = '<h2>Veja também</h2><div class="grade">' + rel.map(cardHtml).join('') + '</div>';
}
