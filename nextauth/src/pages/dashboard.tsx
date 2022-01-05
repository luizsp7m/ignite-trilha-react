import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    api.get("/me").then(response => console.log(response))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h5>Seja bem-vindo, {user?.email}</h5>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  }
});