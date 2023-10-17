import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GrClose } from "react-icons/gr";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const handleDelete = (index) => {
    const filtered = cart.filter((_, i) => i != index);
    setCart(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col lg={12}>
          {cart.map((el, i) => (
            <div className="form-inline divItemsCart" key={i}>
              <div>
                <p>Item: {el.item}</p>
                <p>Quantity: {el.quantity}</p>
              </div>
              <i onClick={() => handleDelete(i)}>
                <GrClose />
              </i>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
