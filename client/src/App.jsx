import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // ใช้ useState เก็บข้อมูลที่ดึงมา
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // สถานะ loading
  const [error, setError] = useState(false); // สถานะ error

  // เมื่อมีการเปลี่ยนแปลงบางอย่างจะทำการ re-render ใหม่
  useEffect(() => {
    main();
  }, []);

  // ดึงข้อมูลเก็บไว้ที่ useState
  const main = async () => {
    setLoading(true); // เริ่มโหลดข้อมูล
    setError(false); // รีเซ็ตสถานะ error
    try {
      const response = await axios.get("http://localhost:4001/product");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Fetching Error...", error);
      setError(true); // ตั้งค่า error เป็น true
      setProducts([]); // ล้างข้อมูลในกรณีเกิดข้อผิดพลาด
    } finally {
      setLoading(false); // เสร็จสิ้นการโหลด
    }
  };

  // ฟังก์ชั่น เมื่อกดปุ่มลบ จะเข้าไปลบใน server และ useState
  const handleDelete = async (postID) => {
    await axios.delete(`http://localhost:4001/products/${postID}`);
    const deleteData = products.filter((product) => product.id !== postID);
    setProducts(deleteData);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loading && <p>Loading...</p>} {/* แสดงข้อความ Loading ขณะโหลด */}
      {error && <p>Fetching Error...</p>} {/* แสดงข้อความ Error เมื่อเกิดข้อผิดพลาด */}
      {!loading && !error && ( // แสดงข้อมูลเมื่อโหลดสำเร็จและไม่มีข้อผิดพลาด
        <div className="product-list">
          {products.map((post) => {
            return (
              <div className="product" key={post.id}>
                <div className="product-preview">
                  <img
                    src={post.image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {post.name}</h1>
                  <h2>Product price: {post.price} Baht</h2>
                  <p>Product description: {post.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post.id)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;