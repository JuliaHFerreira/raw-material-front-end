// scripts/translations/pt-br.js
window.TRANSLATIONS = window.TRANSLATIONS || {};

window.TRANSLATIONS.pt = {
  // App Name
  'app-name': 'Raw Material Stock',

  // Menu Items
  'menu-dashboard': 'Dashboard',
  'menu-products': 'Produtos',
  'menu-raw-materials': 'Matéria-Prima',
  'menu-structure': 'Estrutura',
  'menu-manufacturing': 'Manufatura',
  'menu-stock': 'Estoque',
  'menu-available-production': 'Disponível Produção',
  'stock-movement': 'Movimentação de Estoque - Manual',
  'menu-support': 'Suporte',
  'menu-feedback': 'Feedback',
  'menu-settings': 'Configurações',

  // Page Titles
  'page-title-dashboard': 'Dashboard',
  'user': 'Usuário',

  // Dashboard
  'dashboard-total-products': 'Quantidade de Produtos Cadastrados',
  'dashboard-total-raw-materials': 'Quantidade de Matérias-Primas Cadastradas',
  'dashboard-total-cost': 'Custo Total de Produtos',
  'shortcuts': 'Atalhos',
  'shortcut-products': 'Cadastro de Produtos',
  'shortcut-raw-materials': 'Cadastro de Matéria-Prima',
  'shortcut-structure': 'Gerenciar Estrutura de Produtos',

  // Products
  'products-management': 'Gerenciamento de Produtos',
  'new-product': 'Novo Produto',
  'search-products': 'Buscar produtos...',
  'no-products': 'Nenhum produto cadastrado',

  // Raw Materials
  'raw-materials-management': 'Gerenciamento de Matéria-Prima',
  'new-raw-material': 'Nova Matéria-Prima',
  'search-raw-materials': 'Buscar matérias-primas...',
  'no-raw-materials': 'Nenhuma matéria-prima cadastrada',

  // Structure
  'structure-management': 'Estrutura de Produtos',
  'new-structure': 'Nova Estrutura',
  'search-structures': 'Buscar estruturas...',
  'no-structures': 'Nenhuma estrutura cadastrada',

  // Stock
  'stock-management': 'Controle de Estoque',
  'search-stock': 'Buscar no estoque...',
  'no-stock': 'Nenhum item em estoque',
  'stock-movement-title': 'Movimentação de Estoque',

  // Production
  'available-production-title': 'Disponibilidade para Produção',
  'refresh': 'Atualizar',
  'loading': 'Carregando...',

  // Table Headers
  'table-code': 'Código',
  'table-description': 'Descrição',
  'table-type': 'Tipo',
  'table-barcode': 'Código de Barras',
  'table-price': 'Preço',
  'table-cost': 'Custo',
  'table-actions': 'Ações',
  'table-product-code': 'Código Produto',
  'table-raw-code': 'Código Matéria-Prima',
  'table-quantity': 'Quantidade',
  'table-loss': 'Perda (%)',
  'table-stock-quantity': 'Quantidade em Estoque',
  'table-available-quantity': 'Quantidade Disponível',
  'table-total-value': 'Valor Total',
  'table-priority': 'Prioridade',
  'table-status': 'Status',
  'table-structure': 'Estrutura',

  // Form Labels
  'form-code': 'Código*',
  'form-description': 'Descrição* (máx. 90 caracteres)',
  'form-product-type': 'Tipo de Produto*',
  'form-barcode-ean': 'Código de Barras (EAN 13)*',
  'form-price': 'Preço*',
  'form-cost': 'Custo*',
  'form-product-code': 'Código do Produto/Matéria-Prima',
  'form-product-code-label': 'Código do Produto*',
  'form-raw-code': 'Código da Matéria-Prima*',
  'form-quantity': 'Quantidade',
  'form-quantity-label': 'Quantidade*',
  'form-loss': 'Perda (%)*',
  'form-barcode': 'Código de Barras (EAN 13)',
  'form-movement-type': 'Tipo de Movimentação',
  'form-product-code-clear': 'Código do Produto*',

  // Form Options
  'select': 'Selecione...',
  'entry': 'Entrada (ENTRY)',
  'output': 'Saída (OUTPUT)',

  // Buttons
  'cancel': 'Cancelar',
  'save': 'Salvar',
  'edit': 'Editar',
  'delete': 'Excluir',
  'clear': 'Limpar',
  'execute-movement': 'Executar Movimentação',
  'clear-all-structure': 'Limpar Estrutura',
  'enter-product-code': 'Digite o código do produto:',
  'clear-all-structure': 'Limpar Estrutura',
  'confirm-clear': 'Confirmar',

  // Status
  'available': 'Disponível',
  'unavailable': 'Indisponível',

  // Messages
  'confirm-delete-product': 'Tem certeza que deseja excluir este produto?',
  'confirm-delete-raw-material': 'Tem certeza que deseja excluir esta matéria-prima?',
  'confirm-delete-structure': 'Tem certeza que deseja excluir esta linha da estrutura?',
  'confirm-clear-stock': 'ATENÇÃO: Tem certeza que deseja LIMPAR TODO O ESTOQUE deste item? Esta ação não pode ser desfeita!',
  'success-product-created': 'Produto criado com sucesso!',
  'success-product-updated': 'Produto atualizado com sucesso!',
  'success-product-deleted': 'Produto excluído com sucesso!',
  'success-raw-material-created': 'Matéria-prima criada com sucesso!',
  'success-raw-material-updated': 'Matéria-prima atualizada com sucesso!',
  'success-raw-material-deleted': 'Matéria-prima excluída com sucesso!',
  'success-structure-created': 'Estrutura criada com sucesso!',
  'success-structure-updated': 'Estrutura atualizada com sucesso!',
  'success-structure-deleted': 'Linha da estrutura excluída com sucesso!',
  'success-stock-cleared': 'Estoque limpo com sucesso!',
  'success-stock-updated': 'Movimentação de estoque realizada com sucesso!',
  'error-loading-products': 'Erro ao carregar produtos',
  'error-loading-raw-materials': 'Erro ao carregar matérias-primas',
  'error-loading-structures': 'Erro ao carregar estruturas',
  'error-loading-stock': 'Erro ao carregar estoque',
  'error-loading-production': 'Erro ao carregar produção disponível',
  'error-saving-product': 'Erro ao salvar produto',
  'error-saving-raw-material': 'Erro ao salvar matéria-prima',
  'error-saving-structure': 'Erro ao salvar estrutura',
  'error-deleting-product': 'Erro ao excluir produto',
  'error-deleting-raw-material': 'Erro ao excluir matéria-prima',
  'error-deleting-structure': 'Erro ao excluir estrutura',
  'error-clearing-stock': 'Erro ao limpar estoque',
  'error-updating-stock': 'Erro ao realizar movimentação',
  'error-product-not-found': 'Produto não encontrado',
  'error-raw-material-not-found': 'Matéria-prima não encontrada',
  'error-structure-not-found': 'Estrutura não encontrada',
  'confirm-clear-all-structure': 'ATENÇÃO: Tem certeza que deseja excluir TODA A ESTRUTURA do produto {code}? Esta ação não pode ser desfeita!',
  'success-all-structure-deleted': 'Toda estrutura do produto foi excluída com sucesso!',
  'warning': 'ATENÇÃO',
  'clear-structure-warning': 'Esta ação irá excluir TODAS as estruturas relacionadas a este produto. Esta ação não pode ser desfeita!',
  'success-all-structure-deleted': 'Toda estrutura do produto foi excluída com sucesso!'
};
