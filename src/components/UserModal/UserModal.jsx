import { X } from "lucide-react";
import './usermodal.css'
const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  // Закрытие при клике по фону
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-avatar-wrapper">
            <img src={user.image} alt={user.firstName} />
          </div>
          <div className="modal-title">
            <h2>{user.lastName} {user.firstName}</h2>
            <p>{user.maidenName || 'Нет девичьей фамилии'}</p>
          </div>

          <div className="modal-grid">
            <div className="modal-info-card">
              <span className="info-label">Возраст / Пол</span>
              <div className="info-value">
                {user.age} лет, {user.gender === 'female' ? 'Женский' : 'Мужской'}
              </div>
            </div>
            <div className="modal-info-card">
              <span className="info-label">Рост / Вес</span>
              <div className="info-value">{user.height} см / {user.weight} кг</div>
            </div>
            <div className="modal-info-card" style={{gridColumn: 'span 2'}}>
              <span className="info-label">Электронная почта</span>
              <div className="info-value" style={{color: '#2563eb'}}>{user.email}</div>
            </div>
            <div className="modal-info-card">
              <span className="info-label">Телефон</span>
              <div className="info-value">{user.phone}</div>
            </div>
            <div className="modal-info-card">
              <span className="info-label">Город / Страна</span>
              <div className="info-value">{user.address.city}, {user.address.country}</div>
            </div>
            <div className="modal-info-card" style={{gridColumn: 'span 2'}}>
              <span className="info-label">Адрес проживания</span>
              <div className="info-value">
                {user.address.address}, {user.address.state}, {user.address.postalCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserModal;