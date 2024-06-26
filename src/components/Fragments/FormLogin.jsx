import { login } from "../../services/auth.service";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect, useRef, useState } from "react";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  // Handle Klik untuk Login
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    login(data, (status, res) => {
      if(status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  // Penggunaan useRef untuk mengarahkan mouse di input Email ketika form Login dibuka
  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);



  return (
    <form onSubmit={handleLogin}>

      <InputForm label="username (johnd)" type="text" placeholder="username" name="username" ref={usernameRef} />
      <InputForm label="Password (m38rmF$)" type="password" placeholder="*****" name="password" />
           
      <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
      {loginFailed && <p className="text-red-500 text-center mt-5">{loginFailed}</p>}
    </form>
  );
}

export default FormLogin;