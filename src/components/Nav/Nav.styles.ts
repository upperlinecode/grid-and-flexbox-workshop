import styled from "styled-components";

export const NavRoot = styled.div`
  background-color: rgb(18, 131, 218);
  color: white;
  min-height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-weight: 100;
`;

export const Logo = styled.div`
  font-family: "Rubik Beastly", cursive;
  font-size: 20px;
  margin-left: 1rem;
`;

export const ButtonCluster = styled.div`
  button {
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    color: white;
    border-radius: 15px;
    padding: 5px 10px;
  }

  button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
