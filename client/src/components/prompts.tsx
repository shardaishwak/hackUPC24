import styled from "styled-components";
import {
	bodyDesktop1,
	bodyDesktop2,
	bodyDesktop3,
	bodyMobileTablet1,
	bodyMobileTablet2,
	bodyMobileTablet3,
	heading1,
	limitLines,
} from "../../typography";
import colors from "../../colors";
import Image from "next/image";
import { Roboto_Flex } from "next/font/google";

const Prompts = () => {
    return (
        <Container>
            <Container1 id="mainContainer">
                <Container3></Container3>
              <p>Here goes the input of the user</p>  
            </Container1>
            <Container2>
                <p>Here goes the output of the machine</p>
            </Container2>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height:100vh;
    flex-direction: column;
    justify-content: flex-end;
`;

const Container1 = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Container2 = styled.div`
    display: flex;
    padding-top: 4px;
    justify-content: flex-start;
`;

const Container3 = styled.div`
    display: flex;
`;

export default Prompts;