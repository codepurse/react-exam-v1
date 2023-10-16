import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import Products from "../components/products";

export default function Index() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/products/categories");
      const categories = await response.json();
      const arr = [];
      categories.map((item) => {
        arr.push({
          value: item,
          label: item,
        });
      });
      setCategories(arr);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    async function fetchData() {
      const response = await fetch(
        `https://dummyjson.com/products/category/${e.value}`
      );
      const products = await response.json();
      setItems(products.products);
    }
    fetchData();
  };

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Row>
        <Col lg={12}>
          <div>
            <Select
              options={categories}
              onChange={handleChange}
              placeholder="Select categories"
            />
          </div>
        </Col>
        <Col lg={12}>
          <Products items={items} />
        </Col>
      </Row>
    </Container>
  );
}
