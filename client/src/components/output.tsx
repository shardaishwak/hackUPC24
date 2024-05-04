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

const Output = () => {
    return (
        <Container>
            <TopButtons>
                <ViewButtons>
                    <TwoButton>2d</TwoButton>

                    <ThreeButton>3d</ThreeButton>
                </ViewButtons>
                
                <ViewCode>View Code</ViewCode>

            </TopButtons>

            <MainDiv>
                <Display>
                </Display>
            </MainDiv>
        </Container>
    )
}

const Container = styled.div`
    display: flex
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
`;

const TopButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5%;
`;

const ViewButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TwoButton = styled.button`

`;

const ThreeButton = styled.button`

`;

const ViewCode = styled.button`

`;

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95%;
    background-color: ${colors.blue100};
    border-radius: 16px;
`;

const Display = styled.div`
    display: flex;
`;

export default Output;