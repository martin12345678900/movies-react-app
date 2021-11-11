import styled from "styled-components";

export const StyledImage = styled((props) => <img {...props}/>)`
    width: ${(props) => props.width}rem;
    height: ${(props) => props.height}rem;
`;