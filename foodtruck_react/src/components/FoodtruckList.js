import React from "react";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Container
} from "reactstrap";

class FoodtruckList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodtrucks: []
    };
  }

  componentDidMount() {
    axios
      .get("https://ftruck-api.herokuapp.com/api/foodTrucks/")
      .then(result => {
        this.setState({ foodtrucks: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { foodtrucks } = this.state;

    const foodtruckList = foodtrucks.map(foodtruck => {
      return (
        <Col key={foodtruck._id}>
          <Card>
            <CardBody>
              <CardTitle>{foodtruck.vendorName}</CardTitle>
              <CardSubtitle>{foodtruck.foodType}</CardSubtitle>
              <CardText>Website: {foodtruck.metadata.url}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return (
      <React.Fragment>
        <Container>
          <h1 className="text-center">Foodtrucks</h1>
          <Row>{foodtruckList}</Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default FoodtruckList;
