import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import CreateLink from './Link/CreateLink';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import SearchLinks from './Link/SearchLink';
import LinkList from './Link/LinkList';
import LinkDetail from './Link/LinkDetail';
import Header from './Header';
import useAuth from './Auth/useAuth';
import firebase, { FirebaseContext } from '../firebase';

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Routes>
              <Route path="/" element={<LinkList page="1" />} />
              <Route path="/create" element={<CreateLink />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/search" element={<SearchLinks />} />
              <Route path="/top" element={<LinkList />} />
              <Route path="/new/:page" element={<LinkList page="1" />} />
              <Route path="/link/:linkId" element={<LinkDetail />} />
            </Routes>

          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;