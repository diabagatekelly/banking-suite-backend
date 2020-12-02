import React, {useState} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {selectNav} from './actions/navActions';
import { Navbar, Nav, Collapse, NavbarToggler} from "reactstrap";
import { styled } from '@material-ui/core/styles';


/** Top navigation bar for site. */
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

const {nav} = useSelector(st => st.nav)
const dispatch = useDispatch();

    const MyNavbar = styled(Navbar)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 55,
        width: '100%',
        padding: '0 30px',
        position: 'fixed',
        zIndex: 5
      });

      const MyToggler =styled(NavbarToggler)({
        border: "1px solid black"
      })


      const toggle = () => setIsOpen(!isOpen);

  return (
    
    <>
<MyNavbar expand="lg">
<NavLink onClick={() => dispatch(selectNav('HOME_UNAUTH'))} to="/" className="navbar-brand">Banking Suite</NavLink>
<MyToggler onClick={toggle} />
<Collapse isOpen={isOpen} navbar>

<Nav navbar>
 {nav}
</Nav>

<NavLink onClick={() => dispatch(selectNav('LOGINPAGE'))} className="ml-auto" activeClassName="selected" exact to="/register-login">Register/Login</NavLink>
</Collapse>

</MyNavbar>


  </>
);
}

export default NavBar;