import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email invalide !" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      error:
        "Mot de passe invalide ! Min 8 caractères, une maj, un chiffre, un symbole spécial",
    });
  }

  res.json({ token: "fake-jwt-token", message: "Connexion réussie !" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
