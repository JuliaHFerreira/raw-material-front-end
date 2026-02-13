// UI Management
const UI = {
    // Show toast notification
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    // Show/Hide modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    },

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    },

    // Switch pages
    switchPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }

        // Update active nav item
        document.querySelectorAll('.navigation-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update page title
        const titles = {
            'dashboard': 'page-title-dashboard',
            'products': 'products-management',
            'raw-materials': 'raw-materials-management',
            'structure': 'structure-management',
            'stock': 'stock-management',
            'available-production': 'available-production-title',
            'stock-movement': 'stock-movement-title',
            'support': 'menu-support',
            'feedback': 'menu-feedback',
            'settings': 'menu-settings'
        };

        const titleKey = titles[pageId] || 'page-title-dashboard';
        document.getElementById('pageTitle').textContent = translate(titleKey);
        document.getElementById('pageTitle').setAttribute('data-translate', titleKey);
    },

    // Format currency
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    },

    // Format number
    formatNumber(value) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    },

    // Confirm dialog
    confirm(message) {
        return window.confirm(message);
    },

    // Render products table
    renderProductsTable(products, searchTerm = '') {
        const tbody = document.getElementById('productsTableBody');

        if (!products || products.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-products">${translate('no-products')}</td></tr>`;
            return;
        }

        const filtered = products.filter(p =>
            !searchTerm ||
            p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.barcode && p.barcode.includes(searchTerm))
        );

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-products-found">${translate('no-products-found')}</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(product => `
            <tr>
                <td>${product.code}</td>
                <td>${product.description}</td>
                <td>${product.typeProduct}</td>
                <td>${product.barcode || '-'}</td>
                <td>${UI.formatCurrency(product.price || 0)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="button-edit" data-id="${product.id}" data-action="edit-product">
                            <i class="fas fa-edit"></i> <span data-translate="edit">${translate('edit')}</span>
                        </button>
                        <button class="button-delete" data-id="${product.id}" data-action="delete-product">
                            <i class="fas fa-trash"></i> <span data-translate="delete">${translate('delete')}</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add event listeners to buttons
        tbody.querySelectorAll('[data-action="edit-product"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.editProduct(id);
            });
        });

        tbody.querySelectorAll('[data-action="delete-product"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.deleteProduct(id);
            });
        });
    },

    // Render raw materials table
    renderRawMaterialsTable(rawMaterials, searchTerm = '') {
        const tbody = document.getElementById('rawMaterialsTableBody');

        if (!rawMaterials || rawMaterials.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-raw-materials">${translate('no-raw-materials')}</td></tr>`;
            return;
        }

        const filtered = rawMaterials.filter(rm =>
            !searchTerm ||
            rm.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rm.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (rm.barcode && rm.barcode.includes(searchTerm))
        );

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-raw-materials-found">${translate('no-raw-materials-found')}</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(rm => `
            <tr>
                <td>${rm.code}</td>
                <td>${rm.description}</td>
                <td>${rm.typeProduct}</td>
                <td>${rm.barcode || '-'}</td>
                <td>${UI.formatCurrency(rm.cost || 0)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="button-edit" data-id="${rm.id}" data-action="edit-raw-material">
                            <i class="fas fa-edit"></i> <span data-translate="edit">${translate('edit')}</span>
                        </button>
                        <button class="button-delete" data-id="${rm.id}" data-action="delete-raw-material">
                            <i class="fas fa-trash"></i> <span data-translate="delete">${translate('delete')}</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add event listeners to buttons
        tbody.querySelectorAll('[data-action="edit-raw-material"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.editRawMaterial(id);
            });
        });

        tbody.querySelectorAll('[data-action="delete-raw-material"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.deleteRawMaterial(id);
            });
        });
    },

    // Render structures table
    renderStructuresTable(structures, searchTerm = '') {
        const tbody = document.getElementById('structuresTableBody');

        if (!structures || structures.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-structures">${translate('no-structures')}</td></tr>`;
            return;
        }

        const filtered = structures.filter(s =>
            !searchTerm ||
            s.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.rawCode.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="no-data" data-translate="no-structures-found">${translate('no-structures-found')}</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(structure => `
            <tr>
                <td>${structure.id}</td>
                <td>${structure.productCode}</td>
                <td>${structure.rawCode}</td>
                <td>${UI.formatNumber(structure.quantity)}</td>
                <td>${UI.formatNumber(structure.loss)}%</td>
                <td>
                    <div class="action-buttons">
                        <button class="button-edit" data-id="${structure.id}" data-action="edit-structure">
                            <i class="fas fa-edit"></i> <span data-translate="edit">${translate('edit')}</span>
                        </button>
                        <button class="button-delete" data-id="${structure.id}" data-action="delete-structure">
                            <i class="fas fa-trash"></i> <span data-translate="delete">${translate('delete')}</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add event listeners to buttons
        tbody.querySelectorAll('[data-action="edit-structure"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.editStructure(id);
            });
        });

        tbody.querySelectorAll('[data-action="delete-structure"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.deleteStructure(id);
            });
        });
    },

    // Render stock table
    renderStockTable(stock, searchTerm = '') {
        const tbody = document.getElementById('stockTableBody');

        if (!stock || stock.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="no-data" data-translate="no-stock">${translate('no-stock')}</td></tr>`;
            return;
        }

        const filtered = stock.filter(s =>
            !searchTerm ||
            s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (s.barcode && s.barcode.includes(searchTerm))
        );

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="no-data" data-translate="no-items-found">${translate('no-items-found')}</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.description || '-'}</td>
                <td>${item.typeProduct || '-'}</td>
                <td>${item.barcode || '-'}</td>
                <td>${UI.formatNumber(item.stockQuantity || 0)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="button-warning" data-code="${item.code}" data-action="clear-stock">
                            <i class="fas fa-broom"></i> <span data-translate="clear">${translate('clear')}</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add event listeners to buttons
        tbody.querySelectorAll('[data-action="clear-stock"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.getAttribute('data-code');
                window.clearStock(code);
            });
        });
    },

    // Render available production table
    renderAvailableProductionTable(production) {
        const tbody = document.getElementById('availableProductionTableBody');

        if (!production || production.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="no-data" data-translate="loading">${translate('loading')}</td></tr>`;
            return;
        }

        tbody.innerHTML = production.map(item => {
            const canProduce = item.maxProducible > 0 && item.structureStatus === 'OK';
            const statusClass = canProduce ? 'available' : 'unavailable';
            const statusText = item.structureStatus === 'OK' ? translate('available') : translate('unavailable');

            return `
                <tr>
                    <td>${item.productCode}</td>
                    <td>${item.productDescription || '-'}</td>
                    <td>${UI.formatNumber(item.maxProducible || 0)}</td>
                    <td>${UI.formatCurrency(item.totalPrice || 0)}</td>
                    <td>${item.priority}</td>
                    <td>${item.structureStatus}</td>
                    <td>
                        <span class="status-badge ${statusClass}" data-translate="${item.structureStatus === 'OK' ? 'available' : 'unavailable'}">${statusText}</span>
                    </td>
                </tr>
            `;
        }).join('');
    }
};