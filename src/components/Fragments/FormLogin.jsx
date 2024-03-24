import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect, useRef } from "react";

const FormLogin = () => {
  // Handle Klik untuk Login
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);
    // console.log(e.target.email.value);
    // console.log(e.target.password.value);
    // console.log("login");
    window.location.href = "/products";
  };

  // Penggunaan useRef untuk mengarahkan mouse di input Email ketika form Login dibuka
  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);



  return (
    <form onSubmit={handleLogin}>

      <InputForm label="Email" type="email" placeholder="example@gmail.com" name="email" ref={emailRef} />
      <InputForm label="Password" type="password" placeholder="*****" name="password" />
           
      <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
    </form>
  );
}

export default FormLogin;