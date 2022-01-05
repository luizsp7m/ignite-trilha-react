import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>PERFREACT</title>
      </Head>

      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <SearchResults
        results={results}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}
