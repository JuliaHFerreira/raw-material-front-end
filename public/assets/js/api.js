// API Configuration
const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:8080";

// API Service
const API = {
    // Products
    products: {
        getAll: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/product`);
                if (!response.ok) throw new Error('Error fetching products');
                return await response.json();
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        },

        getByCode: async (code) => {
            try {
                const response = await fetch(`${API_BASE_URL}/product/${code}`);
                if (!response.ok) throw new Error('Product not found');
                return await response.json();
            } catch (error) {
                console.error('Error fetching product:', error);
                throw error;
            }
        },

        create: async (product) => {
            try {
                const response = await fetch(`${API_BASE_URL}/product/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: product.code,
                        description: product.description,
                        typeProduct: product.typeProduct,
                        barcode: product.barcode,
                        price: parseFloat(product.price)
                    })
                });
                if (!response.ok) throw new Error('Error creating product');
                return await response.json();
            } catch (error) {
                console.error('Error creating product:', error);
                throw error;
            }
        },

        update: async (id, product) => {
            try {
                const response = await fetch(`${API_BASE_URL}/product/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: product.code,
                        description: product.description,
                        typeProduct: product.typeProduct,
                        barcode: product.barcode,
                        price: parseFloat(product.price)
                    })
                });
                if (!response.ok) throw new Error('Error updating product');
                return await response.json();
            } catch (error) {
                console.error('Error updating product:', error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await fetch(`${API_BASE_URL}/product/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Error deleting product');
                return true;
            } catch (error) {
                console.error('Error deleting product:', error);
                throw error;
            }
        }
    },

    // Raw Materials
    rawMaterials: {
        getAll: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/rawmaterial`);
                if (!response.ok) throw new Error('Error fetching raw materials');
                return await response.json();
            } catch (error) {
                console.error('Error fetching raw materials:', error);
                throw error;
            }
        },

        getByCode: async (code) => {
            try {
                const response = await fetch(`${API_BASE_URL}/rawmaterial/${code}`);
                if (!response.ok) throw new Error('Raw material not found');
                return await response.json();
            } catch (error) {
                console.error('Error fetching raw material:', error);
                throw error;
            }
        },

        create: async (rawMaterial) => {
            try {
                const response = await fetch(`${API_BASE_URL}/rawmaterial/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: rawMaterial.code,
                        description: rawMaterial.description,
                        typeProduct: rawMaterial.typeProduct,
                        barcode: rawMaterial.barcode,
                        cost: parseFloat(rawMaterial.cost)
                    })
                });
                if (!response.ok) throw new Error('Error creating raw material');
                return await response.json();
            } catch (error) {
                console.error('Error creating raw material:', error);
                throw error;
            }
        },

        update: async (id, rawMaterial) => {
            try {
                const response = await fetch(`${API_BASE_URL}/rawmaterial/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: rawMaterial.code,
                        description: rawMaterial.description,
                        typeProduct: rawMaterial.typeProduct,
                        barcode: rawMaterial.barcode,
                        cost: parseFloat(rawMaterial.cost)
                    })
                });
                if (!response.ok) throw new Error('Error updating raw material');
                return await response.json();
            } catch (error) {
                console.error('Error updating raw material:', error);
                throw error;
            }
        },

        delete: async (id) => {
            try {
                const response = await fetch(`${API_BASE_URL}/rawmaterial/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Error deleting raw material');
                return true;
            } catch (error) {
                console.error('Error deleting raw material:', error);
                throw error;
            }
        }
    },

    // Structure
    structure: {
        getAll: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure`);
                if (!response.ok) throw new Error('Error fetching structures');
                return await response.json();
            } catch (error) {
                console.error('Error fetching structures:', error);
                throw error;
            }
        },

        getByCode: async (code) => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure/${code}`);
                if (!response.ok) throw new Error('Structure not found');
                return await response.json();
            } catch (error) {
                console.error('Error fetching structure:', error);
                throw error;
            }
        },

        create: async (structure) => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productCode: structure.productCode,
                        rawCode: structure.rawCode,
                        quantity: parseFloat(structure.quantity),
                        loss: parseFloat(structure.loss)
                    })
                });
                if (!response.ok) throw new Error('Error creating structure');
                return await response.json();
            } catch (error) {
                console.error('Error creating structure:', error);
                throw error;
            }
        },

        update: async (id, structure) => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: parseFloat(structure.quantity),
                        loss: parseFloat(structure.loss)
                    })
                });
                if (!response.ok) throw new Error('Error updating structure');
                return await response.json();
            } catch (error) {
                console.error('Error updating structure:', error);
                throw error;
            }
        },

        deleteByProductCode: async (productCode) => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure/all/${productCode}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Error deleting structure');
                return true;
            } catch (error) {
                console.error('Error deleting structure by product code:', error);
                throw error;
            }
        },

        deleteById: async (id) => {
            try {
                const response = await fetch(`${API_BASE_URL}/structure/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Error deleting structure row');
                return true;
            } catch (error) {
                console.error('Error deleting structure:', error);
                throw error;
            }
        }
    },

    // Stock
    stock: {
        getAll: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/stock`);
                if (!response.ok) throw new Error('Error fetching stock');
                return await response.json();
            } catch (error) {
                console.error('Error fetching stock:', error);
                throw error;
            }
        },

        clear: async (code) => {
            try {
                const response = await fetch(`${API_BASE_URL}/stock/clear/${code}`, {
                    method: 'PUT'
                });
                if (!response.ok) throw new Error('Error clearing stock');
                return true;
            } catch (error) {
                console.error('Error clearing stock:', error);
                throw error;
            }
        },

        update: async (code, stockUpdate) => {
            try {
                const response = await fetch(`${API_BASE_URL}/stock/update/${code}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: stockUpdate.code,
                        barcode: stockUpdate.barcode,
                        stockQuantity: parseFloat(stockUpdate.stockQuantity),
                        stockUpdate: stockUpdate.stockUpdate
                    })
                });
                if (!response.ok) throw new Error('Error updating stock');
                return await response.json();
            } catch (error) {
                console.error('Error updating stock:', error);
                throw error;
            }
        }
    },

    // Production
    production: {
        getAvailable: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/product/production`);
                if (!response.ok) throw new Error('Error fetching available production');
                return await response.json();
            } catch (error) {
                console.error('Error fetching available production:', error);
                throw error;
            }
        }
    }
};