import FormRegister from "../components/Fragments/FormRegister";
import AuthLayout from "../components/Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <FormRegister />
      <p className="text-sm mt-5 text-center">Have an account? <Link to="/login" className="font-bold text-blue-600">Login</Link></p>
    </AuthLayout>

    // React punya yang namanya ClienSideRouting --> dia tidak memanggil dulu ke server untuk meminta dokumen DOM nya, yang alhasil perpindahan halaman terasa lebih smooth
  )
}

export default RegisterPage;