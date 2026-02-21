import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby raclette cornhole shoreditch, vape chillwave prism austin man braid scenester. Listicle glossier cliche, flexitarian vexillologist truffaut migas sartorial. Wayfarers echo park
            shoreditch, banh mi before they sold out sartorial scenester whatever.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login/Demo User
          </Link>
        </div>
        <div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </div>
    </Wrapper>
  );
}

export default Landing;
