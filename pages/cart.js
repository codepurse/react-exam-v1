import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col lg={12}>
          {cart.map((el, i) => (
            <div key={i} className="divItemsCart">
              <p>Item: {el.item}</p>
              <p>Quantity: {el.quantity}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
