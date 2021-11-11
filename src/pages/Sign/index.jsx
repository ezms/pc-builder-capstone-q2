import LoginContainer from "../../components/LoginContainer";
import RegisterContainer from "../../components/RegisterContainer";
import SignContainer from "./styles";
import { useAuth } from "../../providers/auth";
import { Redirect } from "react-router";
import Header from "../../components/Header";

const Sign = () => {
  const { token } = useAuth();
  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Header />
      <SignContainer>
        <LoginContainer />
        <RegisterContainer />
      </SignContainer>
    </>
  );
};

export default Sign;
