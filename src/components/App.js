import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateLink from "./Link/CreateLink";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import SearchLinks from "./Link/SearchLink";
import LinkList from "./Link/LinkList";
import LinkDetail from "./Link/LinkDetail";
import Header from "./Header";


function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header/>
                <div className="route-container">
                    <Routes>
                        <Route path="/" element={<LinkList page="1"/>}/>
                        <Route path="/create" element={<CreateLink/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/forgot" element={<ForgotPassword/>}/>
                        <Route path="/search" element={<SearchLinks/>}/>
                        <Route path="/top" element={<LinkList/>}/>
                        <Route path="/new/:page" element={<LinkList/>}/>
                        <Route path="/link/:linkId" element={<LinkDetail/>}/>
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
