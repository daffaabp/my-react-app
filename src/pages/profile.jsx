import { useLogin } from "../hooks/useLogin";

const ProfilePage = () => {
  const username = useLogin();
  return (
    <div>
      <h1>Profile</h1>
      Usernme : {username}
    </div>
  );
}

export default ProfilePage;

// Custom hooks dapat digunakan untuk membuat satu fungsi dimana fungsi dapat digunakan berulang kali
// untuk penulisan diawal menggunakan kata "use" --> misal : useLogin