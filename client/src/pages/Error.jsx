import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Oops! Page not found</h3>
          <p>The page you are looking for does not exist.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
}
export default Error;
