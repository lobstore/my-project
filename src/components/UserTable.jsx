import UserRow from './UserRow';
import SortIcon from './SortIcon';
import { ITEMS_PER_PAGE } from '../constraints/paginationconstraints.js';
import './usertable.css'
const UserTable = ({ users, sortConfig, onSort, onUserClick }) => {
  const columns = [
    { id: 'fullName', label: 'ФИО', width: '30%', sortable: true },
    { id: 'age', label: 'Возраст', width: '10%', sortable: true },
    { id: 'gender', label: 'Пол', width: '10%', sortable: true },
    { id: 'phone', label: 'Телефон', width: '15%', sortable: true },
    { id: 'email', label: 'Email', width: '15%', sortable: false },
    { id: 'address', label: 'Адрес', width: '20%', sortable: false },
  ];

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.id} 
                onClick={() => col.sortable && onSort(col.id)} 
                style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {col.label} 
                  {col.sortable && <SortIcon field={col.id} sortConfig={sortConfig} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => <UserRow key={user.id} user={user} onClick={onUserClick} />)
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '3rem' }}>
                Пользователи не найдены
              </td>
            </tr>
          )}
          {/* Заполнитель для сохранения высоты */}
          {users.length > 0 && users.length < ITEMS_PER_PAGE && (
            [...Array(ITEMS_PER_PAGE - users.length)].map((_, i) => (
              <tr key={`empty-${i}`}><td colSpan={columns.length}></td></tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;