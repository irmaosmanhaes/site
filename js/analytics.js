/* Google Tag (GTM-TD7VMCNS) + eventos de clique */
(function () {
  var ID = "GTM-TD7VMCNS";
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtm.js?id=" + ID;
  document.head.appendChild(s);

  function nomeProduto(a) {
    var el = a.closest(".produto, .card");
    var n = el && el.querySelector("h1, .nome");
    return (n ? n.textContent : document.title).trim().slice(0, 100);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    var ev = null;
    if (/mercadolivre\.com/i.test(h)) ev = "click_mercado_livre";
    else if (/wa\.me|whatsapp/i.test(h)) ev = "click_whatsapp";
    else if (/^tel:/i.test(h)) ev = "click_telefone";
    if (!ev) return;
    dataLayer.push({ event: ev, produto: nomeProduto(a), link_url: h, pagina: location.pathname });
  }, true);
})();
