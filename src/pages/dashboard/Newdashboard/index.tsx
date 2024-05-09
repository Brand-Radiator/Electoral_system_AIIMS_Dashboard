import { Col, Row } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import StatisticsWidget from "../../widgets/StatisticsWidget";

const Newdashboard = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Dashboard", path: "/dashboard", active: true },
        ]}
        title={"Dashboard"}
      />

      <Row>
        <h1>Heloooooooooo Suraj</h1>
        {/* <Col sm={6} xl={3}>
          <StatisticsWidget
            variant="primary"
            title="Today Revenue"
            stats="$851"
            icon="shopping-bag"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatisticsWidget
            variant="warning"
            title="Product Sold"
            stats="2541"
            icon="briefcase"
          />
        </Col> */}
      </Row>
    </>
  );
};

export default Newdashboard;
