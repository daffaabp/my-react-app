import { Fragment, useState, useEffect } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
// import Counter from "../components/Fragments/Counter";

const products = [
  {
    id: 1,
    name: "Sepatu Baru",
    price: 1000000,
    image: "/images/shoes-1.jpg",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
  },
  {
    id: 2,
    name: "Sepatu Lama",
    price: 750000,
    image: "/images/shoes-3.jpg",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
  },
  {
    id: 3,
    name: "Sepatu Baru",
    price: 2500000,
    image: "/images/shoes-4.jpg",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
  }
];

// Tangkap Email yang ada pada LocalStorage
const email = localStorage.getItem('email');


// Lifecycle React
// 1. Fase Mounting --> fase dimana sebuah komponen itu diciptakan
// 2. Fase Updating --> sebuah komponen bertumbuh, berkembang
// 3. Fase Unmounting --> fase ketika komponen dihancurkan atau tidak ditampilkan lagi di websitenya

// a. ComponenDidMount --> di eksekusi ketika Mounting




const ProductsPage = () => {

  // Hook adalah sebuah tools yang dimiliki oleh React yang mempunyai banyak fungsi yang dapat digunakan
  const [cart, setCart] = useState([]);

  // Definisikan state baru dengan useEffect
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    if(cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
        }, 0);
        setTotalPrice(sum);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
    
  const handleLogout = () => {
    localStorage.removeItem('email');
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

  return (
    <Fragment>

      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
      {email}
      <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="flex justify-center py-5">
        <div className="w-4/6 flex flex-wrap">
          {products.map((product) => (
          <CardProduct key={product.id}>
            <CardProduct.Header image={product.image} />
            <CardProduct.Body name={product.name}>
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
                {cart.map((item) => {
                  const product = products.find((product) => product.id == item.id);
                  return (
                    <tr key={item.id}>
                      <td>{product.name}</td>
                      <td>Rp{" "}
                        {product.price.toLocaleString('id-ID', {
                          styles: 'currency', 
                          currency: 'IDR',
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>Rp{" "}
                        {(item.qty * product.price).toLocaleString("id-ID", {
                            styles: "currency", 
                            currency: "IDR",
                        })}
                      </td>
                    </tr>
                  )
                })}

                {/* Total Price */}
                <tr>
                  <td colSpan={3}><b>Total Price</b></td>
                  <td>
                    <b>
                      Rp{" "}{totalPrice.toLocaleString("id-ID", {
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