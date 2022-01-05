import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";
import styles from "../styles/Home.module.css"

interface Results {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  });
  const [search, setSearch] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({
      totalPrice, data: products
    });
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
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}
