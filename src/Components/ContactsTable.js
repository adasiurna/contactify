import React, { Component } from 'react'
import axios from 'axios'
import Contact from './Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faBars, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheck, faBars, faArrowDown)

class ContactsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: true,
      city: true,
      email: true,
      phone: true,
      showTableMenu: false,
      showCard: false,
      singleContact: {}
    }
    this.toggleName = this.toggleName.bind(this);
    this.toggleCity = this.toggleCity.bind(this);
    this.toggleEmail = this.toggleEmail.bind(this);
    this.togglePhone = this.togglePhone.bind(this);
    this.toggleTableMenu = this.toggleTableMenu.bind(this);
    this.handleContactClick = this.handleContactClick.bind(this);
  }

  toggleName(event) {
    if (!event.target.checked) {
      this.setState({ name: false })
    } else {
      this.setState({ name: true })
    }
  }

  toggleCity(event) {
    if (!event.target.checked) {
      this.setState({ city: false })
    } else {
      this.setState({ city: true })
    }
  }

  toggleEmail(event) {
    if (!event.target.checked) {
      this.setState({ email: false })
    } else {
      this.setState({ email: true })
    }
  }

  togglePhone(event) {
    if (!event.target.checked) {
      this.setState({ phone: false })
    } else {
      this.setState({ phone: true })
    }
  }

  toggleTableMenu(event) {
    if (event.target.checked) {
      this.setState({ showTableMenu: true })
    } else {
      this.setState({ showTableMenu: false })
    }
  }

  handleContactClick(event) {
    let singleContactId = event.target.getAttribute('data-id');
    console.log(event.target.parentElement);
    if (this.state.showCard && singleContactId == this.state.singleContact.id) {
      this.setState({ showCard: false })
    } else {
      this.setState({ showCard: true })
      this.fetchOneContact(singleContactId);
    }
  }

  fetchOneContact(id) {
    const URL = "https://contactify-api.herokuapp.com/api/contacts";
    axios
      .get(URL, {
        mode: "no-cors"
      })
      .then(contacts => {
        let singleContact = contacts.data.filter(contact => contact.id === id);
        this.setState(state => ({
          singleContact: singleContact[0]
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    let image = require('../img/userpic.jpg');
    return (
      <div className={this.state.showCard ? "main-container-table main-container-background-grey" : "main-container-table"}>
        <div className="table-and-header">
          <div className="table-header-and-filter">
            <div className="table-header">
              <table>
                <thead>
                  <tr>
                    {this.state.name &&
                      <td className="table-header-name">
                        <div className="table-header-item">Name
              <label className="checkbox sort-by-name">
                            <input type="radio" name="sortByName" onClick={this.props.OnSortByName} />
                            <FontAwesomeIcon icon="arrow-down" />
                          </label>
                        </div>
                      </td>
                    }
                    {this.state.city &&
                      <td className="table-header-city">
                        <div className="table-header-item">City</div>
                      </td>
                    }
                    {this.state.email &&
                      <td className="table-header-email">
                        <div className="table-header-item">Email</div>
                      </td>
                    }
                    {this.state.phone &&
                      <td className="table-header-phone">
                        <div className="table-header-item">Phone</div>
                      </td>
                    }
                  </tr>
                </thead>
              </table>
            </div>
            <div className={this.state.showTableMenu ? "table-columns-filter filter-background-white" : "table-columns-filter filter-background-aqua"} >
              <label className="checkbox">
                <input type="checkbox" onClick={this.toggleTableMenu} />
                <FontAwesomeIcon className="fa-bars" icon="bars" />
              </label>
              {this.state.showTableMenu &&
                <div className="table-filter-menu">
                  <ul>
                    <li>
                      <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.name} onChange={this.toggleName} />
                        <FontAwesomeIcon className="fa-check" icon="check" /><p>Name</p>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.city} onChange={this.toggleCity} />
                        <FontAwesomeIcon className="fa-check" icon="check" /><p>City</p>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.email} onChange={this.toggleEmail} />
                        <FontAwesomeIcon className="fa-check" icon="check" /><p>Email</p>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.phone} onChange={this.togglePhone} />
                        <FontAwesomeIcon className="fa-check" icon="check" /><p>Phone</p>
                      </label>
                    </li>
                  </ul>
                </div>}


            </div>
          </div>
          <div className="table-columns-all">
            <table>
              <tbody>
                <Contact singleContact={this.state.singleContact} OnContactClick={this.handleContactClick}
                  showName={this.state.name}
                  showCity={this.state.city}
                  showEmail={this.state.email}
                  showPhone={this.state.phone}
                  contacts={this.props.contacts} />
              </tbody>
            </table >
          </div>
        </div>

        {this.state.showCard &&
          <div className="main-container-card">
            <div className="card-top"></div>
            <div className="card">
              <div className="card-photo"><img src={image.default} alt="userpic" /></div>
              <div className="card-description">
                <div className="card-description-item">
                  <div className="card-description-label">Name:</div>
                  <div className="card-description-info">{this.state.singleContact.name} {this.state.singleContact.surname}</div>
                </div>
                <div className="card-description-item">
                  <div className="card-description-label">City:</div>
                  <div className="card-description-info">{this.state.singleContact.city}</div>
                </div>
                <div className="card-description-item">
                  <div className="card-description-label">Email:</div>
                  <div className="card-description-info">
                    <a href={"mailto:" + this.state.singleContact.email}>{this.state.singleContact.email}</a>
                  </div>
                </div>
                <div className="card-description-item">
                  <div className="card-description-label">Phone:</div>
                  <div className="card-description-info">{this.state.singleContact.phone}</div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    )
  }


}

export default ContactsTable;