import { useState } from "react";
import { Dashboard } from "./components/Dashboard";

import { Header } from "./components/Header";

import { GlobalStyle } from './styles/global';

export function App() {
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionsModalOpen(true);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
    </>
  );
}