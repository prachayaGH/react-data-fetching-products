import "./App.css"
import axios from "axios"
import { useState, useEffect } from "react"

function App() {
  useEffect(() => {
    getProducts()
  }, [])

  const [products, setProduct] = useState([])

  const getProducts = async () => {
    const products = await axios.get("http://localhost:4001/products")
    setProduct(products.data.data)
  }

  const handleDeleteBtn = async (productId) => {
    const deleteProduct = await axios.delete(
      `http://localhost:4001/products/${productId}`
    )
    getProducts()
  }

  return (
    <div className='App'>
      <div className='app-wrapper'>
        <h1 className='app-title'>Products</h1>
      </div>
      {products.map((product) => {
        return (
          <div className='product-list' key={`${product.id} - ${product.name}`}>
            <div className='product'>
              <div className='product-preview'>
                <img
                  src={product.image}
                  alt={product.name}
                  width='350'
                  height='350'
                />
              </div>
              <div className='product-detail'>
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className='delete-button'
                onClick={() => handleDeleteBtn(product.id)}
              >
                x
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
