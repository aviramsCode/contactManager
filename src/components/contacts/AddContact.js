import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//install at terminal by - npm i uuid - generate a unike id for each contact
import uuid from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  //recives dispatch method from the context value via the Consumer
  //Check for errors on the form
  //uses the dispatch method to add the new contact sumbited
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

    const newContact = {
      name,
      email,
      phone
    };

    //sends post request to the server with the new contact, then it dispatch and change the state with the response given by the server
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({
      type: "ADD_CONTACT",
      payload: res.data
    });

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

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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

export default AddContact;
