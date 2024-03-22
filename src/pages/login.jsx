import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <FormLogin />
      <p className="text-sm mt-5 text-center">Do not have an account? <Link to="/register" className="font-bold text-blue-600">Register</Link></p>
    </AuthLayout>

    // React punya yang namanya ClienSideRouting --> dia tidak memanggil dulu ke server untuk meminta dokumen DOM nya, yang alhasil perpindahan halaman terasa lebih smooth
  )
}

export default LoginPage;