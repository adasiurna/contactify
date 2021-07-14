import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import ContactsTable from './Components/ContactsTable';
import DynamicCitiesSelect from './Components/DynamicCitiesSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from 'react-loader-spinner'

library.add(fab, faCheck, faEye)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contacts: [],
      error: undefined,
      filteredContacts: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchContacts = this.fetchContacts.bind(this)
    this.sortByName = this.sortByName.bind(this)
  }

  componentDidMount() {
    document.title = "Contactify";
    this.fetchContacts();
    this.matchState();
  }

  matchState() {
    this.setState({
      filteredContacts: this.state.contacts
    });
  }

  fetchContacts() {
    const URL = "https://contactify-api.herokuapp.com/api/contacts";
    axios
      .get(URL, {
        mode: "no-cors"
      })
      .then(contacts => {
        this.setState(state => ({
          loading: false,
          contacts: contacts.data
        }));
        this.matchState();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault()
    const name = event.target.elements.name.value.toLowerCase();
    const city = event.target.elements.city.value;
    const showActive = event.target.elements.showActive.checked;

    if (!showActive) {
      //filter by name && city
      if (name && city !== 'City') {
        this.setState({
          filteredContacts: this.state.contacts.filter(
            contact =>
              (contact.name.toLowerCase().includes(name) || contact.surname.toLowerCase().includes(name))
              &&
              contact.city.includes(city)
          )
        })
        //filter by name only
      } else if (name && city === "City") {
        this.setState({
          filteredContacts: this.state.contacts.filter(
            contact =>
              (contact.name.toLowerCase().includes(name) || contact.surname.toLowerCase().includes(name))
          )
        })
        //filter by city only
      } else if (!name && city !== "City") {
        this.setState({
          filteredContacts: this.state.contacts.filter(
            contact =>
              contact.city.includes(city)
          )
        })
        //return all contacts
      } else if (!name && city === "City") {
        console.log("return all contacts please");
        this.matchState();
      }
      //show active by name and city
    } else if (name && city !== 'City') {
      this.setState({
        filteredContacts: this.state.contacts.filter(
          contact =>
            (contact.name.toLowerCase().includes(name) || contact.surname.toLowerCase().includes(name))
            &&
            contact.city.includes(city)
            &&
            contact.isActive
        )
      })
      //show active by name only
    } else if (name && city === "City") {
      this.setState({
        filteredContacts: this.state.contacts.filter(
          contact =>
            (contact.name.toLowerCase().includes(name) || contact.surname.toLowerCase().includes(name))
            &&
            contact.isActive
        )
      })
      //show active by city only
    } else if (!name && city !== "City") {
      this.setState({
        filteredContacts: this.state.contacts.filter(
          contact =>
            contact.city.includes(city)
            &&
            contact.isActive
        )
      })
      //show all active
    } else if (!name && city === "City") {
      this.setState({
        filteredContacts: this.state.contacts.filter(
          contact =>
            contact.isActive
        )
      })
    }
  }

  sortByName() {
    this.setState({
      filteredContacts: this.state.filteredContacts.sort((a, b) => a.name.localeCompare(b.name))
    })
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <div className="header-main">

            <form onSubmit={this.handleSubmit}>
              <input className="header-main-item header-filter-name" type="text" placeholder="Name" name="name" />
              <DynamicCitiesSelect selectedCity={this.state.selectedCity} contacts={this.state.contacts} />
              <label className="checkbox header-main-item header-filter-active">
                <input type="checkbox" name="showActive" />
                <FontAwesomeIcon className="fa-check" icon="check" />
                <p className="header-filter-active-label">
                  Show active &nbsp;
                  <FontAwesomeIcon className="fa-eye" icon="eye" />
                </p>
              </label>
              <input className="header-main-item button" type="submit" value="FILTER" />
            </form>

          </div>
          <div className="header-logo">CONTACTIFY</div>
        </div>
        {this.state.loading ?
          <div className="loader"><LoadingSpinner type="ThreeDots" color="#4EB7BE" height="100" width="100" /></div> :
          <ContactsTable OnSortByName={this.sortByName} contacts={this.state.filteredContacts} />
        }
      </div>
    );

  }

}

export default App;