import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  DynamicFeed,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/users" className="link">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
          </Link>
          <Link to="/posts" className="link">
            <li className="sidebarListItem">
              <Storefront className="sidebarIcon" />
              Posts
            </li>
          </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link className="link" to = "/reports">
              <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
              </li>
            </Link>
           <Link className = "link" to= "/feedback">
              <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
              </li>
           </Link>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
