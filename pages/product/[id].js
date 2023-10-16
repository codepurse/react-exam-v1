import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductDetails from "../../components/ProductDetails";

export default function Product() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://dummyjson.com/products/${router.query.id}`
      );
      const product = await response.json();
      console.log(product);
      setData(product);
    }
    fetchData();
  }, [router]);

  const handleChangeImage = (e) => setIndex(e);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row>
        <Col lg={6}>
          <div className="divProductsImg">
            <img className="imgMainProd" src={data?.images?.[index]}></img>
          </div>
          <div className="form-inline mt-2">
            {data?.images?.map((el, i) => (
              <div key={i}>
                <img
                  src={el}
                  id={i === index ? "selectedImage" : ""}
                  className="imgProd"
                  onClick={() => handleChangeImage(i)}
                ></img>
              </div>
            ))}
          </div>
        </Col>
        <Col lg={6}>
          <ProductDetails data={data} />
        </Col>
      </Row>
    </Container>
  );
}
