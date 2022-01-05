import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import styles from "../styles/Home.module.css";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required={true}
        placeholder="E-mail"
      />

      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required={true}
        minLength={6}
        placeholder="Senha"
      />

      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});