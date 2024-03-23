import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

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


  return (
    <form onSubmit={handleLogin}>

      <InputForm label="Email" type="email" placeholder="example@gmail.com" name="email" />
      <InputForm label="Password" type="password" placeholder="*****" name="password" />
           
      <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
    </form>
  );
}

export default FormLogin;