import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;
    return regex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("❌ Email invalide. Exemple : user@mail.com");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "❌ Mot de passe invalide. Minimum 8 caractères avec 1 maj, 1 chiffre et 1 symbole."
      );
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Connexion réussie ✅");
      } else {
        alert(data.error || "Erreur d'authentification");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur !");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center w-full justify-center 
      bg-gradient-to-r from-[#341c51] to-gray-800 via-[#471235]"
    >
      <article className="absolute ml-[-600px] text-3xl mb-5 font-bold">
        <h1 className="mb-1.5 text-[#113257]">MONEFY</h1>
        <h2 className="text-[#ACACAC]">Never lose track of your expenses !</h2>
      </article>

      <div className="pt-[10px] mt-[30px] ml-[500px] bg-[#113257] w-[250px] h-[460px] rounded-[7px] text-white font-bold">
        REGISTRATION
        <p className="pt-[35px] font-light">
          Chose to track and how you want to balance your expenses.
        </p>
        <p className="font-light">It starts by login</p>

        <div className="bg-[#E9ECEE] mt-[20px] w-[250px] h-[340px] rounded-2xl">
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
            )}

            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[200px] mt-2.5 text-black p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[200px] mt-2.5 p-2 text-black border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-[150px] bg-[#1a384d] text-white py-3 rounded-lg 
              hover:bg-[#6E9FC1] transition"
            >
              LOG IN
            </button>

            <p className="text-black hover:text-gray-600">Forgot password ?</p>
            <p className="text-black text-sm font-light">
              Don't have an account yet?
            </p>
            <button
              type="button"
              className="mb-[15px] mt-[-25px] text-[#113257] hover:text-black"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
