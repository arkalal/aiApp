"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import bcrypt from "bcryptjs";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";

const RegisterForm = ({ isLogin }) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Email || !FullName || !Password) {
      setError("All fields are required");
      return;
    }

    try {
      const user = await axios.get("register");
      console.log("user", user);

      const userExists = (email) => {
        return user.data.user.some((user) => user.email === email);
      };

      const isUser = userExists(Email);
      console.log(isUser);

      if (isUser) {
        setError("User already exists");
        return;
      } else {
        setError("");
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      const data = {
        fullName: FullName,
        email: Email,
        password: hashedPassword,
      };

      const res = await axios.post("register", data);

      if (res.status === 200) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        console.log("User Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password..."
        />

        {Error && (
          <>
            <div> {Error} </div>
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
