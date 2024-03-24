import { Fragment, useState, useEffect, useRef } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
import { getProducts } from "../services/product.service";
import { getUsername } from "../services/auth.service";
import Counter from "../components/Fragments/Counter";


const ProductsPage = () => {

  // Hook adalah sebuah tools yang dimiliki oleh React yang mempunyai banyak fungsi yang dapat digunakan
  const [cart, setCart] = useState([]);

  // Definisikan state baru dengan useEffect
  const [totalPrice, setTotalPrice] = useState(0);

  // definsikan stateBaru untuk const products
  const [products, setProducts] = useState([]);

  // definsikan stateBaru untuk const username
  const [username, setUsername] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setUsername(getUsername(token));
    } else {
      window.location.href = "/login";
    }
  }, [])

  // memanggil data API dengan useEffect
  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []); 

  useEffect(() => {
    if(products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
        }, 0);
        setTotalPrice(sum);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);
    
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    window.location.href = "/login";
  }

  // Buat handler untuk Add To Cart
  const handleAddToCart = (id) => {
    if(cart.find(item => item.id === id)) {
      setCart(
        cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      );
    } else {
      setCart([
        ...cart, {id, qty: 1}
      ]);
    }
  };
  
  // Penggunaan useReff
  // useReff hampir sama seperti useEffect, dia bisa menyimpan informasi didalamnya. Tapi yang membedakan adalah useReff ini tidak akan melakukan re render component 
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, {id, qty: 1}];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  // Penggunaan useReff untuk memanipulasi DOM --> seperti document.getElementByID --> untuk menghilangkan total Price apabila tidak ada cart yang dipilih
  const totalPriceRef = useRef(null);
  useEffect(() => {
    if(cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);



  return (
    <Fragment>

      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
      {username}
      <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="flex justify-center py-5">
        <div className="w-4/6 flex flex-wrap">
          {products.length > 0 && products.map((product) => (
          <CardProduct key={product.id}>
            <CardProduct.Header image={product.image} />
            <CardProduct.Body name={product.title}>
              {product.description}
            </CardProduct.Body>
            <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart} />
          </CardProduct>
        ))}
        </div>
        <div className="w-1/4">
            <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
            
            <table className="text-left table-auto border-separate border-spacing-x-5">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 && cart.map((item) => {
                  const product = products.find((product) => product.id == item.id);
                  return (
                    <tr key={item.id}>
                      <td>{product.title.substring(0, 15)}...</td>
                      <td>${" "}
                        {product.price.toLocaleString('id-ID', {
                          styles: "currency", 
                          currency: "USD",
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>${" "}
                        {(item.qty * product.price).toLocaleString("id-ID", {
                            styles: "currency", 
                            currency: "USD",
                        })}
                      </td>
                    </tr>
                  )
                })}

                {/* Total Price */}
                <tr ref={totalPriceRef}>
                  <td colSpan={3}><b>Total Price</b></td>
                  <td>
                    <b>
                      ${" "}{totalPrice.toLocaleString("id-ID", {
                      styles: "currency", 
                      currency: "IDR",
                    })}
                    </b>
                  </td>
                </tr>

              </tbody>
            </table>
        </div>
      </div>

      {/* <div className="mt-5 flex justify-center mb-5">
        <Counter ></Counter>
      </div> */}

    </Fragment>
  );
}

export default ProductsPage;