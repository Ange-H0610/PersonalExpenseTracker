import { FaTrash, FaEdit, FaPlus, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Homepage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [source, setSource] = useState("");

  const categories = ["Food", "Transport", "Entertainment"];

  const token = localStorage.getItem("token");

  // 🔹 Charger les données au montage
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setExpenses(data);
  };

  const fetchIncomes = async () => {
    const res = await fetch("http://localhost:5000/incomes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setIncomes(data);
  };

  // 🔹 Ajouter dépense
  const addExpense = async () => {
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount, category, description })
    });
    setAmount("");
    setCategory("");
    setDescription("");
    fetchExpenses();
  };

  // 🔹 Ajouter revenu
  const addIncome = async () => {
    await fetch("http://localhost:5000/incomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: incomeAmount, source })
    });
    setIncomeAmount("");
    setSource("");
    fetchIncomes();
  };

  // 🔹 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔹 Totaux
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen text-white p-6 overflow-x-hidden bg-animated-gradient">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Personal Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>

      <div className="relative w-full h-64 mb-6">
        <p className="text-purple-200 mt-2">
          Track your expenses, incomes, recurring payments and budget alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expenses */}
        <div className="bg-purple-800 rounded p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Expenses</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 rounded text-black w-20"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded text-black flex-1"
            />
            <button
              onClick={addExpense}
              className="bg-green-500 px-3 rounded hover:bg-green-400"
            >
              <FaPlus />
            </button>
          </div>

          <ul className="space-y-1 max-h-64 overflow-y-auto">
            {expenses.map((exp) => (
              <li
                key={exp._id}
                className="flex justify-between bg-purple-700 p-2 rounded"
              >
                <div>
                  <span className="font-bold">${exp.amount}</span> -{" "}
                  {exp.category} - {exp.description}
                </div>
                <div className="flex gap-2">
                  <button className="text-yellow-400 hover:text-yellow-200">
                    <FaEdit />
                  </button>
                  <button className="text-red-400 hover:text-red-200">
                    <FaTrash />
                  </button>
                  <button className="text-blue-400 hover:text-blue-200">
                    <FaFileUpload />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Incomes */}
        <div className="bg-purple-800 rounded p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Incomes</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              className="p-2 rounded text-black w-20"
            />
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-2 rounded text-black flex-1"
            />
            <button
              onClick={addIncome}
              className="bg-green-500 px-3 rounded hover:bg-green-400"
            >
              <FaPlus />
            </button>
          </div>
          <ul className="space-y-1 max-h-64 overflow-y-auto">
            {incomes.map((inc) => (
              <li
                key={inc._id}
                className="flex justify-between bg-purple-700 p-2 rounded"
              >
                <div>
                  <span className="font-bold">${inc.amount}</span> - {inc.source}
                </div>
                <div className="flex gap-2">
                  <button className="text-yellow-400 hover:text-yellow-200">
                    <FaEdit />
                  </button>
                  <button className="text-red-400 hover:text-red-200">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-purple-900 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Monthly Summary</h2>
        <p>
          Total Income: <span className="font-bold">${totalIncome}</span>
        </p>
        <p>
          Total Expenses: <span className="font-bold">${totalExpense}</span>
        </p>
        <p>
          Remaining Balance: <span className="font-bold">${balance}</span>
        </p>
      </div>
    </div>
  );
}
