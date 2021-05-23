import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../Redux/User/user.actions';
import VerticalNav from './../components/VerticalNav';

import Headers from './../components/Header/index';
import Footer from './../components/Footer/footer';


const DashBoardLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">
      <Headers {...props} />
      <div className="controlPanel">
        <div className="sidebar">
         <VerticalNav>
            <ul>
              <li>
                <Link to="/dashboard">
                  Home
                </Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>  
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
