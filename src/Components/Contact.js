import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEye, faEyeSlash)

class Contact extends Component {
  render() {
    return (
      this.props.contacts.map((contact) => {
        return <tr className={this.props.singleContact.id === contact.id ? "row-selected" : null} key={contact.id} onClick={this.props.OnContactClick}>
          {this.props.showName && <td className="table-column-name" data-id={contact.id}>{contact.name} {contact.surname}</td>}
          {this.props.showCity && <td className="table-column-city" data-id={contact.id}>{contact.city}</td>}
          {this.props.showEmail && <td className="table-column-email" data-id={contact.id}>
            {contact.isActive && <FontAwesomeIcon className="fa-eye" icon="eye" />}
            {!contact.isActive && <FontAwesomeIcon className="fa-eye-slash" icon="eye-slash" />}
            {contact.email}
          </td>}
          {this.props.showPhone && <td className="table-column-phone" data-id={contact.id}>{contact.phone}</td>}
        </tr>
      })

    )
  }
}

export default Contact;