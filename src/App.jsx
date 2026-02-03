import React, { useState, useEffect, useMemo } from 'react';
import {Loader2, Info} from 'lucide-react';
import {fetchUsersData} from './services/api';
import {getSortValue} from './utils/sorting';
import UserTable from './components/UserTable/UserTable.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import SORT_STATES from './constraints/sortstates';
import UserModal from './components/UserModal/UserModal.jsx';
import { ITEMS_PER_PAGE } from './constraints/paginationconstraints.js';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ field: null, state: SORT_STATES.NONE });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsersData()
      .then(data => setUsers(data.users))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    setSortConfig(prev => {
      let newState;
      if (prev.field !== field) newState = SORT_STATES.ASC;
      else if (prev.state === SORT_STATES.ASC) newState = SORT_STATES.DESC;
      else if (prev.state === SORT_STATES.DESC) newState = SORT_STATES.NONE;
      else newState = SORT_STATES.ASC;

      return { field: newState === SORT_STATES.NONE ? null : field, state: newState };
    });
    setCurrentPage(1);
  };

  const sortedUsers = useMemo(() => {
    if (sortConfig.state === SORT_STATES.NONE || !sortConfig.field) return users;
    return [...users].sort((a, b) => {
      const valA = getSortValue(a, sortConfig.field);
      const valB = getSortValue(b, sortConfig.field);
      if (valA < valB) return sortConfig.state === SORT_STATES.ASC ? -1 : 1;
      if (valA > valB) return sortConfig.state === SORT_STATES.ASC ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedUsers, currentPage]);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="header">
          <div className="header-title">
            <h1>Пользователи</h1>
          </div>
          <div className="stats-badge">
            Найдено: <span>{users.length}</span>
          </div>
        </header>

        {error ? (
          <div className="card" style={{padding: '3rem', textAlign: 'center'}}>
            <Info size={48} color="#ef4444" style={{margin: '0 auto 1rem'}} />
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem'}}
            >
              Повторить
            </button>
          </div>
        ) : loading ? (
          <div className="card loader-container">
            <Loader2 className="animate-spin" size={32} color="#2563eb" />
            <p style={{color: '#94a3b8', marginTop: '1rem'}}>Загрузка данных...</p>
          </div>
        ) : (
          <div className="card">
            <UserTable 
              users={paginatedUsers} 
              sortConfig={sortConfig} 
              onSort={handleSort}
              onUserClick={setSelectedUser}
            />
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>
        )}

        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};
export default App;