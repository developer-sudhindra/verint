import styled from "styled-components";

const InfoItem = styled.div`
  font-size: 16px;
  margin-bottom: 14px;
  color: darkslategrey;

  & span {
    color: #777;
    font-size: 12px;
  }
`;

export const Name = styled(InfoItem).attrs({ as: "h1" })``;

export const Email = styled(InfoItem)``;

export const ExpectedTime = styled(InfoItem)``;
