import { MapPin, Phone, Mail } from "lucide-react";
import './userrow.css'
const UserRow = ({ user, onClick }) => (
  <tr onClick={() => onClick(user)}>
    <td>
      <div className="user-info">
        <div className="avatar">
          {user.image ? <img src={user.image} alt="" /> : `${user.lastName[0]}${user.firstName[0]}`}
        </div>
        <div className="name-block">
          <div className="full-name">{user.lastName} {user.firstName}</div>
          <div className="maiden-name">{user.maidenName || '—'}</div>
        </div>
      </div>
    </td>
    <td>
      <span className="age-badge">{user.age} лет</span>
    </td>
    <td style={{textTransform: 'capitalize', fontSize: '0.875rem'}}>
      {user.gender === 'female' ? 'Жен' : 'Муж'}
    </td>
    <td>
      <div className="contact-item font-mono">
        <Phone size={14} className="contact-icon" />
        {user.phone}
      </div>
    </td>
    <td>
      <div className="contact-item truncate">
        <Mail size={14} className="contact-icon" />
        <span className="truncate">{user.email}</span>
      </div>
    </td>
    <td>
      <div className="contact-item">
        <MapPin size={14} className="contact-icon" />
        <div className="name-block">
          <div className="full-name" style={{fontSize: '0.875rem'}}>{user.address.country}</div>
          <div className="maiden-name" style={{fontSize: '0.75rem'}}>{user.address.city}</div>
        </div>
      </div>
    </td>
  </tr>
);
export default UserRow;