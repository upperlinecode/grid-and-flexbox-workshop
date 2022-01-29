import { NavRoot, Logo, ButtonCluster, Title } from "./Nav.styles";
import { Active } from "../App/App";
import { SetStateAction, Dispatch } from "react";

const Nav = (props: { setActive: Dispatch<SetStateAction<Active>> }) => {
  const { setActive } = props;
  return (
    <NavRoot>
      <Logo>Organizr</Logo>
      <Title>Tasks</Title>
      <ButtonCluster>
        <button onClick={() => setActive("table")}>Table</button>
        <button onClick={() => setActive("tiled")}>Tiled</button>
        <button onClick={() => setActive("kanban")}>Kanban</button>
        <button onClick={() => setActive("gantt")}>Gantt</button>
      </ButtonCluster>
    </NavRoot>
  );
};

export default Nav;
