const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const POR_PAGINA = 48;

const LOGO = `<svg viewBox="0 0 54 36" aria-hidden="true"><path d="M2 20 L27 4 L52 20 L52 25 L27 10 L2 25Z" fill="#e5392a"/><rect x="38" y="3" width="6" height="9" fill="#e5392a"/></svg>`;

function cabecalho() {
  document.getElementById('topo').innerHTML = `<div class="in">
    <a class="logo" href="/"><img src="/img/logo.webp" alt="Irmãos Manhães"><div><span>IRMÃOS MANHÃES</span><small>Tudo para sua reforma, casa ou negócio</small></div></a>
    <nav><a href="/">Catálogo</a><a href="https://www.instagram.com/irmaosmanhaes/" target="_blank" rel="noopener">Instagram</a></nav></div>`;
  document.getElementById('rodape').innerHTML = `<div class="in">
    <div><strong>Irmãos Manhães</strong><br>40+ anos de confiança e tradição<br>Alcântara - São Gonçalo/RJ<br>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Irmãos Manhães Alcântara São Gonçalo RJ')}" target="_blank" rel="noopener">📍 Ver no mapa</a></div>
    <div><strong>Atendimento</strong><br>Seg a Sex, 8h às 18h<br>Sábados, 8h às 14h<br>Entrega para todo o Rio de Janeiro</div>
    <div><strong>Contato</strong><br>WhatsApp: <a href="https://wa.me/${WHATS}" target="_blank" rel="noopener">(21) 2701-1051</a><br>
      <a href="https://www.instagram.com/irmaosmanhaes/" target="_blank" rel="noopener">@irmaosmanhaes</a></div>
    <div class="rod-cats" id="rod-cats"></div></div>
    <div class="in rod-fim">Compra 100% segura pelo Mercado Livre. Ao clicar em comprar você é levado ao anúncio oficial.</div>`;
  botaoWhats('Olá! Vim pelo site da Irmãos Manhães e gostaria de mais informações.');
}

const WHATS = '552127011051';
function botaoWhats(msg) {
  const url = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(msg);
  let a = document.getElementById('whats');
  if (!a) { a = document.createElement('a'); a.id = 'whats'; a.className = 'whats'; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); }
  a.href = url;
  a.setAttribute('aria-label', 'Falar no WhatsApp');
  a.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#fff" d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2c1.8 1 3.8 1.500 5.900 1.500 6.900 0 12.600-5.600 12.600-12.500S22.900 3 16 3zm0 22.900c-1.900 0-3.700-.5-5.300-1.500l-.4-.2-4.400 1.200 1.200-4.300-.3-.4a10.300 10.300 0 0 1-1.600-5.600C5.200 9.900 10 5.200 16 5.200s10.800 4.700 10.800 10.400S21.900 25.900 16 25.900zm5.900-7.700c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200l-1 1.200c-.2.200-.4.200-.7.100-1.900-.9-3.100-1.700-4.300-3.800-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.100-1.200 2.800s1.200 3.300 1.400 3.500c.2.200 2.400 3.700 5.800 5.100 2.100.9 2.900.9 3.900.8.600-.1 1.900-.8 2.200-1.500.3-.8.300-1.400.2-1.500-.1-.2-.3-.2-.6-.4z"/></svg><span>Fale conosco</span>`;
}

function carrossel() {
  const el = document.getElementById('banners');
  if (!el) return;
  const wa = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent('Olá! Vim pelo site da Irmãos Manhães e gostaria de mais informações.');
  const slides = [
    { src: '/img/banner-whatsapp.jpg', alt: 'Compre pelo WhatsApp (21) 2701-1051. Atendimento de segunda a sexta, das 8h às 18h, e aos sábados, das 8h às 14h.', href: wa },
    { src: '/img/banner-entrega.jpg', alt: 'Aqui na Irmãos Manhães tem entrega para todo o Rio de Janeiro. Consulte condições com nossos vendedores.', href: wa }
  ];
  el.innerHTML = '<div class="bn-track"></div><div class="bn-dots"></div>';
  const track = el.querySelector('.bn-track'), dots = el.querySelector('.bn-dots');
  let atual = 0, timer;
  const ir = n => {
    const itens = track.children;
    if (!itens.length) return;
    atual = (n + itens.length) % itens.length;
    [...itens].forEach((s, i) => s.classList.toggle('on', i === atual));
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === atual));
  };
  const iniciar = () => { clearInterval(timer); if (track.children.length > 1) timer = setInterval(() => ir(atual + 1), 5500); };
  slides.forEach(s => {
    const a = document.createElement('a');
    a.className = 'bn-slide'; a.href = s.href; a.target = '_blank'; a.rel = 'noopener';
    const img = new Image();
    img.alt = s.alt;
    img.onload = () => {
      a.appendChild(img); track.appendChild(a);
      const d = document.createElement('button'); d.setAttribute('aria-label', 'Banner ' + (track.children.length));
      const idx = track.children.length - 1; d.onclick = () => { ir(idx); iniciar(); }; dots.appendChild(d);
      if (track.children.length === 1) { ir(0); }
      dots.style.display = track.children.length > 1 ? '' : 'none';
      el.style.display = ''; iniciar();
    };
    img.src = s.src;
  });
  el.style.display = 'none';
}

async function carregar() {
  const r = await fetch('/data/produtos.json');
  const dados = await r.json();
  const rc = document.getElementById('rod-cats');
  if (rc) {
    const cats = {};
    dados.produtos.forEach(p => cats[p.catSlug] = p.categoria);
    rc.innerHTML = '<strong>Categorias</strong>' + Object.entries(cats).map(([s, n]) => `<a href="/c/${s}.html">${esc(n)}</a>`).join('');
  }
  return dados;
}

const imgHtml = (p, i = 0) => p.imagens && p.imagens[i]
  ? `<img src="${esc(p.imagens[i])}" alt="${esc(p.nome)}" loading="lazy" referrerpolicy="no-referrer">` : 'Sem foto';

const desconto = p => p.precoAntigo && p.precoAntigo > p.preco ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;

function cardHtml(p) {
  const d = desconto(p);
  return `<a class="card" href="/p/${p.slug}.html">
    <div class="img">${imgHtml(p)}</div>
    <div class="info"><span class="cat">${esc(p.marca || p.categoria)}</span>
    <span class="nome">${esc(p.nome)}</span>
    ${d ? `<span class="antigo">${brl(p.precoAntigo)}</span>` : ''}
    <span class="preco">${brl(p.preco)}${d ? `<span class="off">${d}% OFF</span>` : ''}</span></div></a>`;
}

async function iniciarCatalogo() {
  cabecalho();
  carrossel();
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
  const id = document.body.dataset.id || new URLSearchParams(location.search).get('id');
  const { produtos } = await carregar();
  const p = produtos.find(x => x.id === id);
  const el = document.getElementById('produto');
  if (!p) { el.innerHTML = '<p>Produto não encontrado. <a href="/">Voltar</a></p>'; return; }
  if (!document.body.dataset.id) { location.replace('/p/' + p.slug + '.html'); return; }
  const d = desconto(p);
  const rel = produtos.filter(x => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
  const fotos = p.imagens || [];
  const thumbs = fotos.length > 1 ? `<div class="thumbs">${fotos.map((u, i) => `<button class="th${i ? '' : ' on'}" data-i="${i}" aria-label="Foto ${i + 1}"><img src="${esc(u)}" alt="" loading="lazy" referrerpolicy="no-referrer"></button>`).join('')}</div>` : '';
  el.innerHTML = `<div><div class="img grande" id="principal">${imgHtml(p)}</div>${thumbs}</div>
    <div><span class="cat">${esc(p.categoria)}${p.marca ? ' · ' + esc(p.marca) : ''}</span><h1>${esc(p.nome)}</h1>
    ${d ? `<div class="antigo" style="margin:0">${brl(p.precoAntigo)}</div>` : ''}
    <div class="preco">${brl(p.preco)}${d ? `<span class="off">${d}% OFF</span>` : ''}</div>
    <div class="acoes"><a class="btn" href="${esc(p.linkMercadoLivre)}" target="_blank" rel="noopener">Comprar no Mercado Livre</a>
    <a class="btn sec" href="/c/${p.catSlug}.html">Ver mais em ${esc(p.categoria)}</a></div>
    <div class="selos">✔ Compra protegida pelo Mercado Livre<br>✔ Vendido por Irmãos Manhães<br>ℹ Preço e estoque confirmados no anúncio</div>
    <p class="sobre">${esc(p.descricao || '')}</p></div>`;
  el.querySelectorAll('.th').forEach(b => {
    b.querySelector('img').onerror = () => b.remove();
    b.onclick = () => {
      document.getElementById('principal').innerHTML = imgHtml(p, +b.dataset.i);
      el.querySelectorAll('.th').forEach(x => x.classList.toggle('on', x === b));
    };
  });
  botaoWhats(`Olá! Vim pelo site da Irmãos Manhães e tenho interesse neste produto: ${p.nome} (${brl(p.preco)}). Está disponível?`);
  if (rel.length) document.getElementById('rel').innerHTML = '<h2>Veja também</h2><div class="grade">' + rel.map(cardHtml).join('') + '</div>';
}

async function iniciarPagina() {
  cabecalho();
  await carregar();
}
