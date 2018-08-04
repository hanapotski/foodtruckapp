import React from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap';

import NewTruckModal from './NewTruckModal';

class FoodtruckList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodtrucks: [],
      showModal: false
    };

    this.onToggleModal = this.onToggleModal.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://ftruck-api.herokuapp.com/api/foodTrucks/')
      .then(result => {
        this.setState({ foodtrucks: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onToggleModal() {
    this.setState({ showModal: !this.state.showModal });
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
              <CardText>{foodtruck.metadata.url}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return (
      <React.Fragment>
        <Container className="mt-4">
          <h1 className="text-center">Foodtrucks</h1>
          <Button onClick={this.onToggleModal}>Add new</Button>
          <Row className="mt-3">{foodtruckList}</Row>
        </Container>
        <NewTruckModal
          showModal={this.state.showModal}
          onToggleModal={this.onToggleModal}
        />
      </React.Fragment>
    );
  }
}

export default FoodtruckList;
