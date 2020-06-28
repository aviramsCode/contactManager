import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//install at terminal by - npm i uuid - generate a unike id for each contact
import uuid from "uuid";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  //recives dispatch method from the context value via the Consumer
  //Check for errors on the form
  //uses the dispatch method to edit a contact
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for errors
    if (name === "") {
      //setting the state
      this.setState({ errors: { name: "Name is required" } });
      //stops setting the state
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }
    //ES6 syntax, insted of writing "name: name", etc...
    const updatedContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    //when the user updates a contact the res variable recives back the new updated contact and its id
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // Clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    //Redirect the user to the desired url in push after submiting a new contact
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  {/* each TextInputGroup sends props to the TextInputGroup component and recives the appropriate html section of the form in return */}
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light 
                          btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
