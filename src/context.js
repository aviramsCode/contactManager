import React, { Component } from "react";
//install -> npm i axios, allow us to send http requests
import axios from "axios";

const Context = React.createContext();
//type is a capitalize string that state the type of action nedded to be done
//case: DELETE_CONTACT filter out the desired contact out of the state array & return rest of the contacts
//case: ADD_CONTACT receives a new contact via the payload and enters it to the first position in the array
//case: UPDATE_CONTACT receives an updated contact via the payload, it checks to find the original contact and replace it
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  // async/await waits until axios return result and then set the state
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
