import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
  // Col,
  // FormText
} from 'reactstrap';
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class NewTruckModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truckInfo: {
        vendorName: '',
        foodType: '',
        companyName: '',
        phoneNumber: '',
        companyWebsite: '',
        companyLogo: '',
        vegan: false
      },
      address: ''
    };
  }

  toggle = () => {
    this.props.onToggleModal();
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(name, value);
    this.setState({
      truckInfo: {
        ...this.state.truckInfo,
        [name]: value
      }
    });
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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
              <Label for="vendorName">Address</Label>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Foodtruck location ...',
                        className: 'location-search-input'
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
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

            {/* <FormGroup>
              <Label for="companyLogo">Company Logo</Label>
              <Input type="file" name="companyLogo" id="companyLogo" />
              <FormText color="muted">Upload a logo</FormText>
            </FormGroup> */}

            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="vegan" onChange={this.onChange} />{' '}
                Vegan
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="vegetarian"
                  onChange={this.onChange}
                />{' '}
                Vegetarian
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="gluten-free"
                  onChange={this.onChange}
                />{' '}
                Gluten-free
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="organic"
                  onChange={this.onChange}
                />{' '}
                Organic
              </Label>
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>
            Submit
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewTruckModal;
