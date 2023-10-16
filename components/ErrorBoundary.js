import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

export default function ErrorBoundary() {
  const router = useRouter();

  const handleClick = () => router.push("/");

  return (
    <Row>
      <Col lg={12}>
        <p>
          Something went wrong.{" "}
          <span onClick={handleClick} style={{ cursor: "pointer" }}>
            Go back to list of products.
          </span>
        </p>
      </Col>
    </Row>
  );
}
