import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function Index() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/products");
      const products = await response.json();
      const arr = [];
      products.products.map((item) => {
        arr.push({
          value: item.id,
          label: item.title,
          thumbnail: item.thumbnail,
        });
      });
      setItems(arr);
    }
    fetchData();
  }, []);

  const handleChange = (e) => setSelected(e);

  const handleClick = () => router.push(`/product/${selected.value}`);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <Select options={items} onChange={handleChange} />
      <button onClick={handleClick}>View product</button>
      <img src={selected.thumbnail} />
    </>
  );
}
