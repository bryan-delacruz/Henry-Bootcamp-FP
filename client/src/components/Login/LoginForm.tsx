import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  createUser,
  getCompany,
  resetPassword,
} from "../../redux/actions/public/generalActions";
import UserCreateModal from "../UserCreateModal";
import { useNavigate } from "react-router";
import {
  BackgroundCover,
  BackgroundDiv,
  Form,
  FormContainer,
  GoogleBtn,
  GoogleLogo,
  MainDiv,
  RegisterSelect,
  StyledButton,
  StyledInput,
  Title,
} from "./Styles";
import logo from "../../assets/logo.svg";
import logoGoogle from "../../assets/google-logo.png";
import { Paragraph } from "../../pages/WelcomePage/styles";
import Storage from "../../services/storage";
import { Link } from "react-router-dom";

function LoginForm({ type }: any) {
  const userRole = useSelector((state: any) => state.userReducer.role);
  const companyId = useSelector((state: any) => state.userReducer.company.id);
  const token = useSelector((state: any) => state.userReducer.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRole === "company") {
      dispatch(getCompany(companyId));
      Storage.set("token", token);
      navigate(`/edit-company/${companyId}`);
    } else if (userRole === "applicant") {
      navigate("/home");
    } else if (userRole === "admin") {
      navigate("/admin");
    }
  }, [userRole]);

  const roleId = useSelector((state: any) => state.userReducer.roleId);
  const userCreateModal = useSelector(
    (state: any) => state.userReducer.userCreateModal
  );

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    role: "1",
  });

  if (roleId) {
    navigate("/home");
  }

  const handleChange = ({ target: { name, value } }: any) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };
  const login = (e: any) => {
    e.preventDefault();
    dispatch(
      getUser({ email: formInputs.email, password: formInputs.password })
    );
    setFormInputs({
      email: "",
      password: "",
      role: "1",
    });
  };
  const register = (e: any) => {
    e.preventDefault();
    dispatch(createUser(formInputs));
    setFormInputs({
      email: "",
      password: "",
      role: "1",
    });
  };

  const reset = (e: any) => {
    e.preventDefault();
    dispatch(resetPassword(formInputs.email));
    setFormInputs({
      email: "",
      password: "",
      role: "1",
    });
  };

  const google = () => {
    window.open(`${process.env.REACT_APP_GOOGLE}/auth/google`, "_self");
  };

  return (
    <>
      <MainDiv>
        <BackgroundDiv className="background"></BackgroundDiv>
        <BackgroundCover className="background-cover">
          <FormContainer>
            <img src={logo} alt="" className="logo" />
            <Title>Acceder</Title>
            <Form
              onSubmit={
                type === "register"
                  ? register
                  : type === "login"
                  ? login
                  : reset
              }
            >
              <StyledInput
                placeholder="Email..."
                value={formInputs.email}
                onChange={(e) => handleChange(e)}
                name="email"
                type="text"
              ></StyledInput>
              {type !== "reset" && (
                <StyledInput
                  placeholder="Contraseña..."
                  value={formInputs.password}
                  onChange={(e) => handleChange(e)}
                  name="password"
                  type="text"
                ></StyledInput>
              )}

              {type === "register" && (
                <div style={{ width: "100%" }}>
                  <RegisterSelect
                    onChange={(e) => handleChange(e)}
                    id="role"
                    name="role"
                  >
                    <option defaultValue="1">Escoge un rol</option>
                    <option value="applicant">Applicant</option>
                    <option value="company">Recruiter</option>
                  </RegisterSelect>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {type === "login" ? (
                  <StyledButton onClick={(e) => login(e)} type="submit">
                    Entrar
                  </StyledButton>
                ) : type === "register" ? (
                  <StyledButton onClick={(e) => register(e)} type="submit">
                    Registrarse
                  </StyledButton>
                ) : (
                  <StyledButton onClick={(e) => reset(e)} type="submit">
                    Reset Password
                  </StyledButton>
                )}
              </div>
            </Form>
            {type !== "reset" && (
              <>
                <Paragraph
                  style={{
                    marginTop: "1rem",
                    marginBottom: "7px",
                    fontSize: "17px",
                  }}
                >
                  O ingresa con:
                </Paragraph>
                <GoogleBtn onClick={google}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="google-btn"
                      style={{
                        width: "38px",
                        height: "38px",
                        background: "white",
                        zIndex: "3",
                        alignItems: "center",
                        textAlign: "center",
                        paddingTop: "7px",
                        borderRadius: "2px",
                      }}
                    >
                      <GoogleLogo src={logoGoogle} alt="google-logo" />
                    </div>
                    <div style={{ marginLeft: "80px" }}>Google</div>
                  </div>
                </GoogleBtn>
              </>
            )}
            {type !== "reset" ? (
              <Link to="/reset-password" style={{ marginTop: "16px" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            ) : (
              <Link to="/login" style={{ marginTop: "16px" }}>
                Ingresar
              </Link>
            )}
          </FormContainer>
        </BackgroundCover>
      </MainDiv>
      {userCreateModal.val && (
        <UserCreateModal setForm={setFormInputs} title="Message" />
      )}
    </>
  );
}

export default LoginForm;
