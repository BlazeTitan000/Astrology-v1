import React, { useState } from "react";

export const AdminRedeemPage: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthed(true);
        setPassword("");
      } else {
        setMessage("Incorrect password.");
      }
    } catch {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  const handleSetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/admin/redeem-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redeemCode }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Redeem code set!");
        setRedeemCode("");
      } else {
        setMessage("Failed to set redeem code.");
      }
    } catch {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container flex flex-row items-center justify-center min-h-screen bg-[#0a0a1a]">
      <div className="checkout-card w-full max-w-md mx-auto">
        {!isAuthed ? (
          <form onSubmit={handleLogin}>
            <div className="checkout-header">
              <h2>Admin Login</h2>
            </div>
            <div className="form-section">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-lg w-full mb-4"
                disabled={loading}
              />
            </div>
            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {message && <div className="error-message mt-2">{message}</div>}
          </form>
        ) : (
          <form onSubmit={handleSetCode}>
            <div className="checkout-header">
              <h2>Set Redeem Code</h2>
            </div>
            <div className="form-section">
              <label>Redeem Code</label>
              <input
                type="text"
                placeholder="Enter redeem code"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                className="px-4 py-2 rounded-lg w-full mb-4"
                disabled={loading}
              />
            </div>
            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? "Setting..." : "Set Code"}
            </button>
            {message && <div className="error-message mt-2">{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminRedeemPage;
