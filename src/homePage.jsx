import { FaTrash, FaEdit, FaPlus, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const categories = ["Food", "Transport", "Entertainment"];
  const dummyExpenses = [
    { id: 1, amount: "50", category: "Food", description: "Lunch" },
    { id: 2, amount: "120", category: "Transport", description: "Train ticket" }
  ];
  const dummyIncomes = [
    { id: 1, amount: "2000", source: "Salary" },
    { id: 2, amount: "150", source: "Freelance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-purple-700 text-white p-6 overflow-x-hidden">

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
        <img
          src="https://cdn.pixabay.com/photo/2023/04/16/18/50/money-7921013_1280.png"
          alt="3D money"
          className="absolute w-64 h-64 top-0 right-0 animate-bounce"
        />
        <p className="text-purple-200 mt-2">
          Track your expenses, incomes, recurring payments and budget alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-800 rounded p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Expenses</h2>
          <div className="flex gap-2 mb-2">
            <input type="number" placeholder="Amount" className="p-2 rounded text-black w-20" />
            <select className="p-2 rounded text-black">
              <option>Category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Description" className="p-2 rounded text-black flex-1" />
            <button className="bg-green-500 px-3 rounded hover:bg-green-400"><FaPlus /></button>
          </div>

          <ul className="space-y-1 max-h-64 overflow-y-auto">
            {dummyExpenses.map(exp => (
              <li key={exp.id} className="flex justify-between bg-purple-700 p-2 rounded">
                <div>
                  <span className="font-bold">${exp.amount}</span> - {exp.category} - {exp.description}
                </div>
                <div className="flex gap-2">
                  <button className="text-yellow-400 hover:text-yellow-200"><FaEdit /></button>
                  <button className="text-red-400 hover:text-red-200"><FaTrash /></button>
                  <button className="text-blue-400 hover:text-blue-200"><FaFileUpload /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-800 rounded p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Incomes</h2>
          <div className="flex gap-2 mb-2">
            <input type="number" placeholder="Amount" className="p-2 rounded text-black w-20" />
            <input type="text" placeholder="Source" className="p-2 rounded text-black flex-1" />
            <button className="bg-green-500 px-3 rounded hover:bg-green-400"><FaPlus /></button>
          </div>
          <ul className="space-y-1 max-h-64 overflow-y-auto">
            {dummyIncomes.map(inc => (
              <li key={inc.id} className="flex justify-between bg-purple-700 p-2 rounded">
                <div>
                  <span className="font-bold">${inc.amount}</span> - {inc.source}
                </div>
                <div className="flex gap-2">
                  <button className="text-yellow-400 hover:text-yellow-200"><FaEdit /></button>
                  <button className="text-red-400 hover:text-red-200"><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-purple-900 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Monthly Summary</h2>
        <p>Total Income: <span className="font-bold">$2000</span></p>
        <p>Total Expenses: <span className="font-bold">$170</span></p>
        <p>Remaining Balance: <span className="font-bold">$1830</span></p>
      </div>
    </div>
  );
}
