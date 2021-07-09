import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4,021</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Since 2021</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Posts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10,000</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Since 2021</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">New Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">21</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Since Last Month</span>
      </div>
    </div>
  );
}
