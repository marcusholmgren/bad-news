import React, {useContext} from "react";
import {NavLink} from 'react-router';
import {FirebaseContext} from "../firebase";

const Header: React.FC = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        return null;
    }

    const { user, firebase } = context;
    return <div className="header">
        <div className="flex">
            <img src="/logo192.png" alt="React Logo" className="logo"/>
            <NavLink to="/" className="header-title">
                Bad News
            </NavLink>
            <NavLink to="/new/1" className="header-link">
                new
            </NavLink>
            <div className="divider">|</div>
            <NavLink to="/top" className="header-link">
                top
            </NavLink>
            <div className="divider">|</div>
            <NavLink to="/search" className="header-link">
                search
            </NavLink>
            {user && (<>
                <div className="divider">|</div>
                <NavLink to="/create" className="header-link">
                    submit
                </NavLink>
            </>)}
        </div>
        <div className="flex">
            {user
                ? <>
                    <div className="header-name">{user.displayName}</div>
                    <div className="divider">|</div>
                    <div className="header-button" onClick={async () => await firebase.logout()}>logout</div>
                </>
                : <NavLink to="/login" className="header-link">
                    login
                </NavLink>}
        </div>
    </div>
}

export default Header;
