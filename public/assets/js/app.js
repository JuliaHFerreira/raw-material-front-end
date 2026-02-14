// Application State
let currentProducts = [];
let currentRawMaterials = [];
let currentStructures = [];
let currentStock = [];
let currentProduction = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeModals();
    initializeForms();
    initializeSearch();
    loadDashboardData();
});

// Navigation
function initializeNavigation() {
    // Sidebar navigation
    document.querySelectorAll('.navigation-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            if (page) {
                UI.switchPage(page);
                loadPageData(page);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            }
        });
    });

    // Dropdown menu
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggle.classList.toggle('active');
            const menu = toggle.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) {
                menu.classList.toggle('show');
            }
        });
    });

    // Shortcuts cards
    document.querySelectorAll('.shortcut-card').forEach(card => {
        card.addEventListener('click', () => {
            const page = card.getAttribute('data-page');
            if (page) {
                UI.switchPage(page);
                loadPageData(page);
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });
    }
}

// Load page-specific data
function loadPageData(page) {
    switch (page) {
        case 'products':
            loadProducts();
            break;
        case 'raw-materials':
            loadRawMaterials();
            break;
        case 'structure':
            loadStructures();
            break;
        case 'stock':
            loadStock();
            break;
        case 'available-production':
            loadAvailableProduction();
            break;
        case 'dashboard':
            loadDashboardData();
            break;
    }
}

// Dashboard
async function loadDashboardData() {
    try {
        const [products, rawMaterials] = await Promise.all([
            API.products.getAll().catch(() => []),
            API.rawMaterials.getAll().catch(() => [])
        ]);

        currentProducts = products;
        currentRawMaterials = rawMaterials;

        document.getElementById('totalProducts').textContent = products.length;
        document.getElementById('totalRawMaterials').textContent = rawMaterials.length;

        const totalCost = products.reduce((sum, p) => sum + (p.price || 0), 0);
        document.getElementById('totalCost').textContent = UI.formatCurrency(totalCost);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Products
async function loadProducts() {
    try {
        currentProducts = await API.products.getAll();
        UI.renderProductsTable(currentProducts);
    } catch (error) {
        UI.showToast(translate('error-loading-products'), 'error');
        console.error('Error loading products:', error);
    }
}

document.getElementById('btnNewProduct').addEventListener('click', () => {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModalTitle').textContent = translate('new-product');
    UI.showModal('productModal');
});

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const product = {
        code: document.getElementById('productCode').value,
        description: document.getElementById('productDescription').value,
        typeProduct: document.getElementById('productType').value,
        barcode: document.getElementById('productBarcode').value,
        price: document.getElementById('productPrice').value
    };

    try {
        if (id) {
            await API.products.update(id, product);
            UI.showToast(translate('success-product-updated'));
        } else {
            await API.products.create(product);
            UI.showToast(translate('success-product-created'));
        }
        
        UI.hideModal('productModal');
        loadProducts();
        loadDashboardData();
    } catch (error) {
        UI.showToast(translate('error-saving-product'), 'error');
        console.error('Error saving product:', error);
    }
});

async function editProduct(id) {
    try {
        const product = currentProducts.find(p => String(p.id) === String(id));
        if (!product) {
            UI.showToast(translate('error-product-not-found'), 'error');
            return;
        }

        document.getElementById('productId').value = product.id;
        document.getElementById('productCode').value = product.code;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productType').value = product.typeProduct;
        document.getElementById('productBarcode').value = product.barcode;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productModalTitle').textContent = translate('edit') + ' ' + translate('menu-products');
        
        UI.showModal('productModal');
    } catch (error) {
        UI.showToast(translate('error-loading-products'), 'error');
        console.error('Error editing product:', error);
    }
}

async function deleteProduct(id) {
    if (!UI.confirm(translate('confirm-delete-product'))) {
        return;
    }

    try {
        await API.products.delete(id);
        UI.showToast(translate('success-product-deleted'));
        loadProducts();
        loadDashboardData();
    } catch (error) {
        UI.showToast(translate('error-deleting-product'), 'error');
        console.error('Error deleting product:', error);
    }
}

// Raw Materials
async function loadRawMaterials() {
    try {
        currentRawMaterials = await API.rawMaterials.getAll();
        UI.renderRawMaterialsTable(currentRawMaterials);
    } catch (error) {
        UI.showToast(translate('error-loading-raw-materials'), 'error');
        console.error('Error loading raw materials:', error);
    }
}

document.getElementById('btnNewRawMaterial').addEventListener('click', () => {
    document.getElementById('rawMaterialForm').reset();
    document.getElementById('rawMaterialId').value = '';
    document.getElementById('rawMaterialModalTitle').textContent = translate('new-raw-material');
    UI.showModal('rawMaterialModal');
});

document.getElementById('rawMaterialForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('rawMaterialId').value;
    const rawMaterial = {
        code: document.getElementById('rawMaterialCode').value,
        description: document.getElementById('rawMaterialDescription').value,
        typeProduct: document.getElementById('rawMaterialType').value,
        barcode: document.getElementById('rawMaterialCodeBar').value,
        cost: document.getElementById('rawMaterialCost').value
    };

    try {
        if (id) {
            await API.rawMaterials.update(id, rawMaterial);
            UI.showToast(translate('success-raw-material-updated'));
        } else {
            await API.rawMaterials.create(rawMaterial);
            UI.showToast(translate('success-raw-material-created'));
        }
        
        UI.hideModal('rawMaterialModal');
        loadRawMaterials();
        loadDashboardData();
    } catch (error) {
        UI.showToast(translate('error-saving-raw-material'), 'error');
        console.error('Error saving raw material:', error);
    }
});

async function editRawMaterial(id) {
    try {
        const rawMaterial = currentRawMaterials.find(rm => rm.id === id);
        if (!rawMaterial) {
            UI.showToast(translate('error-raw-material-not-found'), 'error');
            return;
        }

        document.getElementById('rawMaterialId').value = rawMaterial.id;
        document.getElementById('rawMaterialCode').value = rawMaterial.code;
        document.getElementById('rawMaterialDescription').value = rawMaterial.description;
        document.getElementById('rawMaterialType').value = rawMaterial.typeProduct;
        document.getElementById('rawMaterialCodeBar').value = rawMaterial.barcode;
        document.getElementById('rawMaterialCost').value = rawMaterial.cost;
        document.getElementById('rawMaterialModalTitle').textContent = translate('edit') + ' ' + translate('menu-raw-materials');
        
        UI.showModal('rawMaterialModal');
    } catch (error) {
        UI.showToast(translate('error-loading-raw-materials'), 'error');
        console.error('Error editing raw material:', error);
    }
}

async function deleteRawMaterial(id) {
    if (!UI.confirm(translate('confirm-delete-raw-material'))) {
        return;
    }

    try {
        await API.rawMaterials.delete(id);
        UI.showToast(translate('success-raw-material-deleted'));
        loadRawMaterials();
        loadDashboardData();
    } catch (error) {
        UI.showToast('Erro ao excluir matéria-prima', 'error');
        console.error('Error deleting raw material:', error);
    }
}

// Structure
async function loadStructures() {
    try {
        currentStructures = await API.structure.getAll();
        UI.renderStructuresTable(currentStructures);
    } catch (error) {
        UI.showToast(translate('error-loading-structures'), 'error');
        console.error('Error loading structures:', error);
    }
}

document.getElementById('btnNewStructure').addEventListener('click', () => {
    document.getElementById('structureForm').reset();
    document.getElementById('structureId').value = '';
    document.getElementById('structureModalTitle').textContent = translate('new-structure');
    UI.showModal('structureModal');
});

document.getElementById('btnClearAllStructure').addEventListener('click', () => {
    clearAllStructureByCode();
});

// Clear Structure Form Submit
document.getElementById('clearStructureForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productCode = document.getElementById('clearStructureProductCode').value;
    
    try {
        console.log('Limpando toda estrutura do produto:', productCode);
        await API.structure.deleteByProductCode(productCode);
        
        UI.showToast(translate('success-all-structure-deleted'));
        UI.hideModal('clearStructureModal');
        loadStructures();
    } catch (error) {
        UI.showToast(translate('error-deleting-structure'), 'error');
        console.error('Error clearing all structure:', error);
    }
});

document.getElementById('structureForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('structureId').value;
    const structure = {
        productCode: document.getElementById('structureProductCode').value,
        rawCode: document.getElementById('structureRawCode').value,
        quantity: document.getElementById('structureQuantity').value,
        loss: document.getElementById('structureLoss').value
    };

    try {
        if (id) {
            await API.structure.update(id, structure);
            UI.showToast(translate('success-structure-updated'));
        } else {
            await API.structure.create(structure);
            UI.showToast(translate('success-structure-created'));
        }
        
        UI.hideModal('structureModal');
        loadStructures();
    } catch (error) {
        UI.showToast(translate('error-saving-structure'), 'error');
        console.error('Error saving structure:', error);
    }
});

async function editStructure(id) {
    try {
        const structure = currentStructures.find(s => s.id === id);
        if (!structure) {
            UI.showToast(translate('error-structure-not-found'), 'error');
            return;
        }

        document.getElementById('structureId').value = structure.id;
        document.getElementById('structureProductCode').value = structure.productCode;
        document.getElementById('structureRawCode').value = structure.rawCode;
        document.getElementById('structureQuantity').value = structure.quantity;
        document.getElementById('structureLoss').value = structure.loss;
        document.getElementById('structureModalTitle').textContent = translate('edit') + ' ' + translate('menu-structure');
        
        UI.showModal('structureModal');
    } catch (error) {
        UI.showToast(translate('error-loading-structures'), 'error');
        console.error('Error editing structure:', error);
    }
}

async function deleteStructure(id) {
    if (!UI.confirm(translate('confirm-delete-structure'))) {
        return;
    }

    try {
        await API.structure.deleteById(id);
        UI.showToast(translate('success-structure-deleted'));
        loadStructures();
    } catch (error) {
        UI.showToast(translate('error-deleting-structure'), 'error');
        console.error('Error deleting structure:', error);
    }
}

async function clearAllStructureByCode() {
    // Apenas abre o modal
    document.getElementById('clearStructureForm').reset();
    UI.showModal('clearStructureModal');
}

// Stock
async function loadStock() {
    try {
        currentStock = await API.stock.getAll();
        UI.renderStockTable(currentStock);
    } catch (error) {
        UI.showToast(translate('error-loading-stock'), 'error');
        console.error('Error loading stock:', error);
    }
}

async function clearStock(code) {
    if (!UI.confirm(translate('confirm-clear-stock'))) {
        return;
    }

    try {
        await API.stock.clear(code);
        UI.showToast(translate('success-stock-cleared'));
        loadStock();
    } catch (error) {
        UI.showToast(translate('error-clearing-stock'), 'error');
        console.error('Error clearing stock:', error);
    }
}

// Available Production
async function loadAvailableProduction() {
    try {
        currentProduction = await API.production.getAvailable();
        UI.renderAvailableProductionTable(currentProduction);
    } catch (error) {
        UI.showToast(translate('error-loading-production'), 'error');
        console.error('Error loading available production:', error);
    }
}

document.getElementById('btnRefreshProduction').addEventListener('click', () => {
    loadAvailableProduction();
});

// Production
document.getElementById('productionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const code = document.getElementById('productionCode').value;
    const stockUpdate = {
        code: code,
        barcode: document.getElementById('productionBarcode').value,
        stockQuantity: document.getElementById('productionQuantity').value,
        stockUpdate: document.getElementById('productionType').value
    };

    try {
        await API.stock.update(code, stockUpdate);
        UI.showToast(translate('success-stock-updated'));
        document.getElementById('productionForm').reset();
        loadStock();
    } catch (error) {
        UI.showToast(translate('error-updating-stock'), 'error');
        console.error('Error updating stock:', error);
    }
});

// Modal Management
function initializeModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    document.getElementById('searchProducts').addEventListener('input', (e) => {
        UI.renderProductsTable(currentProducts, e.target.value);
    });

    document.getElementById('searchRawMaterials').addEventListener('input', (e) => {
        UI.renderRawMaterialsTable(currentRawMaterials, e.target.value);
    });

    document.getElementById('searchStructures').addEventListener('input', (e) => {
        UI.renderStructuresTable(currentStructures, e.target.value);
    });

    document.getElementById('searchStock').addEventListener('input', (e) => {
        UI.renderStockTable(currentStock, e.target.value);
    });
}

// Form Initialization
function initializeForms() {
    // Disable product code fields when editing
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('reset', () => {
        document.getElementById('productCode').disabled = false;
    });

    const rawMaterialForm = document.getElementById('rawMaterialForm');
    rawMaterialForm.addEventListener('reset', () => {
        document.getElementById('rawMaterialCode').disabled = false;
    });

    const structureForm = document.getElementById('structureForm');
    structureForm.addEventListener('reset', () => {
        document.getElementById('structureProductCode').disabled = false;
        document.getElementById('structureRawCode').disabled = false;
    });
}



// Expose functions globally for event handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.editRawMaterial = editRawMaterial;
window.deleteRawMaterial = deleteRawMaterial;
window.editStructure = editStructure;
window.deleteStructure = deleteStructure;
window.clearAllStructureByCode = clearAllStructureByCode;
window.clearStock = clearStock;;
