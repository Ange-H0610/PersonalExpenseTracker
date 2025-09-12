import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/signup";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert(isLogin ? "Connexion réussie !" : "Inscription réussie !");
      } else {
        alert(data.error || "Erreur !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur !");
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center w-full 
        justify-center bg-gradient-to-r from-[#341c51]
        to-gray-800 via-[#471235]"
      >
        <article
          className="absolute ml-[-600px] 
          text-3xl mb-5 font-bold text-balance "
        >
          <h1 className="mb-1.5 text-[#113257]">MONEFY</h1>
          <h2 className="text-balance text-[#ACACAC]">
            Never lose track of your expenses !
          </h2>
        </article>

        <div className="pt-[10px] mt-[30px] ml-[500px]
          bg-[#113257] w-[250px] h-[460px] rounded-[7px] text-white font-bold">
          
          {isLogin ? "LOGIN" : "SIGN UP"}
          
          <p className="pt-[35px] text-balance font-light ">
            Chose to track and how you want to balance your expenses .
          </p>
          <p className="font-light">
            {isLogin ? "It starts by login" : "Create an account to start"}
          </p>

          <div className="bg-[#E9ECEE] mt-[20px] w-[250px] h-[340px] rounded-2xl">
            <form className="space-y-4 p-3" onSubmit={handleSubmit}>
              
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[200px] mt-2.5 text-black p-2 border rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
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
                  className="w-[200px] mt-2.5 p-2 text-black border
                  rounded-lg focus:outline-none focus:ring-2
                  focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-[150px] bg-[#1a384d]
                text-white py-3 rounded-lg 
                hover:bg-[#6E9FC1] transition"
              >
                {isLogin ? "LOG IN" : "SIGN UP"}
              </button>

              {isLogin && (
                <p className="text-black hover:text-gray-600">
                  Forgot password ?
                </p>
              )}

              <p className="text-black text-sm font-light">
                {isLogin
                  ? "Don't have an account yet?"
                  : "Already have an account?"}
              </p>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="mb-[15px] mt-[-25px] 
                text-[#113257] hover:text-black"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
