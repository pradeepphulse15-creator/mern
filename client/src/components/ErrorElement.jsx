import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const erros = useRouteError();
  return <h4>there was an error</h4>;
};

export default ErrorElement;
