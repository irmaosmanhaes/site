# Irmãos Manhães - Catálogo

Site estático com catálogo de produtos. O botão de cada produto leva ao anúncio no Mercado Livre.

## Como atualizar os produtos
Edite `data/produtos.json`. Cada produto tem: `id` (único), `nome`, `categoria`, `descricao`, `preco`, `imagens` (lista de URLs ou caminhos) e `linkMercadoLivre`.

## Rodar localmente
```
python -m http.server 8000
```
Abra http://localhost:8000
