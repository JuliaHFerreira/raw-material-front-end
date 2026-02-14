# Estoque Nuvem - Sistema de Gestão de Estoque

Frontend responsivo desenvolvido em HTML, CSS e JavaScript puro para sistema de gestão de estoque e produção.

## 🌍 Multilíngue (PT/EN)

O sistema possui **tradução completa** para Português e Inglês:
- 🇧🇷 Português (padrão)
- 🇺🇸 English
- Troca de idioma em tempo real
- Preferência salva no navegador

## 🎨 Design

O sistema utiliza uma paleta de cores em tons de laranja (#ff6b35 e #f7931e), com design moderno e responsivo baseado no layout fornecido.

## 🚀 Funcionalidades

### Dashboard
- Visualização de quantidade de produtos cadastrados
- Quantidade de matérias-primas cadastradas
- Custo total de produtos
- Atalhos rápidos para as principais funcionalidades

### Gestão de Produtos
- ✅ Criar novo produto (POST /product/new)
- ✅ Listar todos os produtos (GET /Product)
- ✅ Buscar produto por código (GET /Product/{CODE})
- ✅ Editar produto (PUT /product/edit/{id})
- ✅ Excluir produto (DELETE /product/{id})
- 🔍 Busca em tempo real

### Gestão de Matéria-Prima
- ✅ Criar nova matéria-prima (POST /rawmaterial/new)
- ✅ Listar todas as matérias-primas (GET /rawmaterial)
- ✅ Buscar matéria-prima por código (GET /rawmaterial/{CODE})
- ✅ Editar matéria-prima (PUT /rawmaterial/edit/{id})
- ✅ Excluir matéria-prima (DELETE /rawmaterial/{id})
- 🔍 Busca em tempo real

### Estrutura de Produtos
- ✅ Criar nova estrutura (POST /structure/new)
- ✅ Listar todas as estruturas (GET /structure)
- ✅ Buscar estrutura por código (GET /structure/{CODE})
- ✅ Editar estrutura (PUT /structure/edit/{id})
- ✅ Excluir toda estrutura de um produto (DELETE /structure/{productCode})
- ✅ Excluir linha específica da estrutura (DELETE /structure/{id})

### Manufatura

#### Estoque
- ✅ Visualizar todo o estoque (GET /stock)
- ✅ Limpar estoque por código (PUT /stock/clear/{code}) - com aviso de confirmação
- 🔍 Busca em tempo real

#### Disponível para Produção
- ✅ Listar produtos disponíveis para produção (GET /product/production)
- 📊 Interface gráfica mostrando quantidades disponíveis
- 🎯 Indicadores visuais de disponibilidade

#### Produção
- ✅ Atualizar estoque (PUT /stock/update/{code})
- ➕ Entrada de estoque (ENTRY)
- ➖ Saída de estoque (OUTPUT)

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- 📱 Mobile (até 480px)
- 📱 Tablet (481px - 768px)
- 💻 Desktop (769px - 1024px)
- 🖥️ Large Desktop (1025px+)

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome 6.4.0 (ícones)

## 💡 Características Técnicas

### Classes CSS em Inglês
Todas as classes CSS seguem nomenclatura em inglês para melhor padronização:
- `.sidebar-navigation` (ao invés de `.sidebar-nav`)
- `.navigation-item` (ao invés de `.nav-item`)
- `.button-primary` (ao invés de `.btn-primary`)
- `.shortcuts-section` (ao invés de `.atalhos-section`)
- `.shortcut-card` (ao invés de `.atalho-card`)

### Sistema de Tradução
- Arquivo dedicado `translations.js` com todas as traduções
- Atributos `data-translate` para textos traduzíveis
- Atributos `data-translate-placeholder` para placeholders
- Função `translate()` global para uso dinâmico
- Preferência de idioma salva em `localStorage`

## 📦 Estrutura de Arquivos

```
estoque-nuvem-frontend/
│
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos globais (classes em inglês)
├── js/
│   ├── translations.js    # Sistema de tradução PT/EN
│   ├── api.js             # Funções de comunicação com a API
│   ├── ui.js              # Funções de interface do usuário
│   └── app.js             # Lógica principal da aplicação
├── tests/
│   ├── setup.js           # Configuração dos testes
│   ├── api.test.js        # Testes da API
│   └── ui.test.js         # Testes da UI
├── package.json           # Configuração do projeto e dependências
└── README.md             # Documentação
```

## 🧪 Testes Unitários

O projeto inclui testes unitários abrangentes:

### Testes de API (`tests/api.test.js`)
- ✅ Testes para todas as operações CRUD de Produtos
- ✅ Testes para todas as operações CRUD de Matérias-Primas
- ✅ Testes para todas as operações de Estrutura
- ✅ Testes para operações de Estoque
- ✅ Testes para Produção Disponível
- ✅ Tratamento de erros

### Testes de UI (`tests/ui.test.js`)
- ✅ Testes de formatação (moeda, números)
- ✅ Testes de notificações (toast)
- ✅ Testes de renderização de tabelas
- ✅ Testes de filtros de busca
- ✅ Testes de estados vazios

## 🎯 Funcionalidades Especiais

### Sistema de Notificações
- Notificações toast animadas
- Tipos: sucesso, erro, aviso
- Desaparecem automaticamente após 3 segundos

### Modais Responsivos
- Modais para criação e edição
- Fechar clicando fora ou no X
- Validação de formulários

### Busca em Tempo Real
- Busca instantânea em todas as tabelas
- Filtro por código, descrição e código de barras
- Feedback visual quando não há resultados

### Navegação Intuitiva
- Menu lateral com ícones
- Menu dropdown para Manufatura
- Breadcrumb visual com título da página
- Menu mobile com botão hambúrguer

### Avisos de Confirmação
- Confirmação antes de excluir
- Confirmação especial ao limpar estoque
- Previne ações acidentais

## 🎨 Paleta de Cores

```css
--primary-color: #ff6b35     /* Laranja principal */
--primary-dark: #e55a2b      /* Laranja escuro */
--primary-light: #ff8256     /* Laranja claro */
--secondary-color: #f7931e   /* Laranja secundário */
--background: #f5f7fa        /* Fundo */
--text-dark: #2c3e50         /* Texto escuro */
--text-light: #ffffff        /* Texto claro */
--success: #27ae60           /* Verde sucesso */
--danger: #e74c3c            /* Vermelho erro */
--warning: #f39c12           /* Amarelo aviso */
```

## 📋 Validações

- Código de Barras: 13 dígitos (EAN 13)
- Descrição: máximo 90 caracteres
- Preço/Custo: números decimais
- Campos obrigatórios marcados com *

## 🔒 Segurança

- Validação de dados no frontend
- Confirmação de ações destrutivas
- Tratamento de erros da API
- Feedback visual para o usuário

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🐛 Tratamento de Erros

O sistema inclui tratamento de erros robusto:
- Mensagens de erro amigáveis
- Logs detalhados no console
- Fallback para estados vazios
- Recuperação automática quando possível

## 📊 Indicadores Visuais

- 🟢 Verde: Disponível para produção
- 🔴 Vermelho: Indisponível
- 🟡 Amarelo: Ações de edição
- 🔴 Vermelho: Ações de exclusão

## 🔄 API Endpoints

Todos os endpoints estão implementados conforme especificação:

**Produtos:**
- POST /product/new
- GET /Product
- GET /Product/{CODE}
- PUT /product/edit/{id}
- DELETE /product/{id}

**Matérias-Primas:**
- POST /rawmaterial/new
- GET /rawmaterial
- GET /rawmaterial/{CODE}
- PUT /rawmaterial/edit/{id}
- DELETE /rawmaterial/{id}

**Estrutura:**
- POST /structure/new
- GET /structure
- GET /structure/{CODE}
- PUT /structure/edit/{id}
- DELETE /structure/{productCode}
- DELETE /structure/{id}

**Estoque:**
- GET /stock
- PUT /stock/clear/{code}
- PUT /stock/update/{code}

**Produção:**
- GET /product/production

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais
