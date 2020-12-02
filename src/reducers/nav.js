import { NavItem} from "reactstrap";
import { Link} from "react-scroll";
import { styled } from '@material-ui/core/styles';

const MyNavitem = styled(NavItem)({
    marginRight: "1em"
  });

const homeUnauth = (
    <>
<MyNavitem>
    <Link 
  activeClass="active"  
  to="banking"
      smooth={true}
      offset={0}
      duration={500}
      isDynamic={true}>Banking & Accounting
  </Link>
</MyNavitem>

<MyNavitem>
  <Link 
  activeClass="active" 
  to="business-management"
      smooth={true}
      offset={0}
      duration={500}
      isDynamic={true}>Online Busiess Management</Link>
</MyNavitem>

<MyNavitem>
  <Link 
  activeClass="active" 
  to="islamic"
      smooth={true}
      offset={0}
      duration={500}
      isDynamic={true}>Islamic Tools</Link>
</MyNavitem>
</>
)

const loginPage = (
    <>
    <MyNavitem>
 
 
</MyNavitem>
    </>
)

const INITIAL_STATE = {nav : homeUnauth}

export default function nav(userLocation = INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOGINPAGE':
            return {...userLocation, nav : loginPage}

        case 'HOME_UNAUTH':
            return {...userLocation, nav : homeUnauth}
    
        default:
            return userLocation;
    }
}