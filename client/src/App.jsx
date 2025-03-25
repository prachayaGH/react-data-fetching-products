import "./App.css"
import axios from "axios"
import { useState, useEffect } from "react"

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true) // เพิ่ม state สำหรับการโหลด

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      setIsLoading(true) // ตั้งค่าเป็น true ก่อนเริ่มโหลดข้อมูล
      const response = await axios.get("http://localhost:4001/products")
      setProducts(response.data.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false) // ตั้งค่าเป็น false เมื่อโหลดเสร็จ (ไม่ว่าจะสำเร็จหรือล้มเหลว)
    }
  }

  const handleDeleteBtn = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`)
      getProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className='App'>
      <div className='app-wrapper'>
        <h1 className='app-title'>Products</h1>
      </div>

      {isLoading ? (
        <div className='loading'>Loading...</div>
      ) : (
        products.map((product) => (
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
        ))
      )}
    </div>
  )
}

export default App
