import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const API_URL = "http://localhost:4001/products";

function App() {
  const [products, setProducts] = useState([]);

  // ดึงข้อมูลสินค้าจาก Server
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setProducts(response.data.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // ฟังก์ชันลบสินค้า
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // ลบสินค้าจาก Server
      setProducts(products.filter(product => product.id !== id)); // อัปเดต State
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt={product.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default App;
