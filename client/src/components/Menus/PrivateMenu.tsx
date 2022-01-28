import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Logout } from "../Logout";
import Notifications from "../Notifications";

type Props = {
  role: string;
};


const NavLinks = styled.nav`
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const A = styled.button<{ About?: boolean }>`
  text-decoration: none;
  border: none;
  background: transparent;
  font-size: 20px;
  color: ${(props) => (props.About ? "#FFFFFF" : "black")};
  font-weight: bolder;
  margin: 0 2rem;
  font-family: Open sans/bold;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  z-index: 1000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: lightblue;
`;

const Options = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const PrivateMenu: FC<Props> = ({ role }) => {
  let location = useLocation();
  console.log(location);
  let isAbout = false;
  if (location.pathname === "/about-us") {
    isAbout = true;
  }
  console.log(isAbout);
  
  const user = useSelector((state: any) => state.userReducer.applicant);

  return (
    <>
      <NavLinks className="multi-options">
        {role === "applicant" ? (
          <>
            <Link to="/home" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Inicio"}</A>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Nosotros"}</A>
            </Link>
            <Link to="/frequent-questions" style={{ textDecoration: "none", cursor:"default"  }}>
              <A About={isAbout}>{"Preguntas Frecuentes"}</A>
            </Link>
            <Link to="/my-applications" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Mis Postulaciones"}</A>
            </Link>
            <Link to='/profile'>
              {user.firstName + ' ' + user.lastName}
            </Link>
          </>
        ) : role === "company" ? (
          <>
            <Link to="/home" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Inicio"}</A>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Nosotros"}</A>
            </Link>
            <Link to="/frequent-questions" style={{ textDecoration: "none", cursor:"default"  }}>
              <A About={isAbout}>{"Preguntas Frecuentes"}</A>
            </Link>
            <A>{"Empresas"}</A>
          </>
        ) : (
          <>
            <Link to="/home" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Inicio"}</A>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none", cursor:"default"  }}>
              <A>{"Nosotros"}</A>
            </Link>
            <A>{"Admin"}</A>
          </>
        )}
      </NavLinks>
      <ButtonsContainer>
        {/* <Logout contenido="Logout" estilo="primary" /> */}
        <Options>
          <Notifications role={role} />
        </Options>

        <Options>
        </Options>

        <Options>
        </Options>
      </ButtonsContainer>
    </>
  );
};

export default PrivateMenu;
