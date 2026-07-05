"use client";

import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // Redirect to dashboard
    router.push("/internal/dashb0ard");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="logo-circle">
          <img 
          src="/icon.png" 
          alt="logo DKV" 
          />
        </div>

        <h1>Login</h1>
        <p>Silakan login untuk mengakses Dashboard.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
