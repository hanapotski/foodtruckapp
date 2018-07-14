import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  FormText
} from "reactstrap";

class NewTruckModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truckInfo: {
        vendorName: "",
        foodType: "",
        companyName: "",
        phoneNumber: "",
        companyWebsite: "",
        companyLogo: "",
        vegan: false
      }
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.props.onToggleModal();
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  onChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(name, value);
    this.setState({
      truckInfo: {
        ...this.state.truckInfo,
        [name]: value
      }
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Add a New Foodtruck</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="vendorName">Vendor Name</Label>
              <Input
                type="text"
                name="vendorName"
                id="vendorName"
                placeholder="Vendor Name"
                onChange={this.onChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="foodType">Food Type</Label>
              <Input
                type="text"
                name="foodType"
                id="foodType"
                placeholder="Food Type"
                onChange={this.onChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="companyName">Company Name</Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Company Name"
                onChange={this.onChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={this.onChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="companyWebsite">Company Website</Label>
              <Input
                type="text"
                name="companyWebsite"
                id="companyWebsite"
                placeholder="Company Website"
                onChange={this.onChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="companyLogo">Company Logo</Label>
              <Input type="file" name="companyLogo" id="companyLogo" />
              <FormText color="muted">Upload a logo</FormText>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="vegan" onChange={this.onChange} />{" "}
                Vegan
              </Label>
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>
            Submit
          </Button>{" "}
          {/* <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewTruckModal;
