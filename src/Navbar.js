import { Link, useMatch, useResolvedPath } from "react-router-dom"
import mainLogo from'./pages/myNUDashboard.png';

export default function Navbar(){
    return (
        <nav className="nav">
            <ul>
                <img src={mainLogo} alt="My Image" />
                <Link to ="/" className="site-title">
                    MyNUDashboard
                </Link>
            </ul>
            <ul>
                <CustomLink to="degree-progress">Degree Progress</CustomLink>
                <CustomLink to="courses">Courses</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props}){
    return (
        <li>
            <Link to={to}{...props}>
                {children}</Link>
        </li>
    )
}