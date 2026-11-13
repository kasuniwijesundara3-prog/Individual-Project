// ProductsContext.jsx
// Holds the product list for the whole app.
// First launch: products come from the local JSON dataset.
// After the admin adds/edits/deletes a product, the list is saved in AsyncStorage
// and loaded from there next time.
import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultProducts from '../data/products.json';
import { KEYS, loadData, saveData } from '../services/storage';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products once when the app starts
  useEffect(() => {
    async function init() {
      const saved = await loadData(KEYS.PRODUCTS, null);
      setProducts(saved || defaultProducts);
      setLoading(false);
    }
    init();
  }, []);

  // Save and update state together
  const persist = async (list) => {
    setProducts(list);
    await saveData(KEYS.PRODUCTS, list);
  };

  // Admin: add a new product
  const addProduct = (product) => {
    const newProduct = { ...product, id: 'p' + Date.now() };
    return persist([newProduct, ...products]);
  };

  // Admin: edit an existing product
  const updateProduct = (id, changes) =>
    persist(products.map((p) => (p.id === id ? { ...p, ...changes } : p)));

  // Admin: delete a product
  const deleteProduct = (id) => persist(products.filter((p) => p.id !== id));

  // Helper used by Details screen
  const getProductById = (id) => products.find((p) => p.id === id);

  // Unique category names for the filter chips and the admin dashboard
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <ProductsContext.Provider
      value={{ products, categories, loading, addProduct, updateProduct, deleteProduct, getProductById }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// Custom hook so screens can write: const { products } = useProducts();
export const useProducts = () => useContext(ProductsContext);
