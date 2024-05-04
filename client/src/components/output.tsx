import styled from "styled-components";

import colors from "../../colors";
import Image from "next/image";
import { Roboto_Flex } from "next/font/google";
import Viewer from "./Viewer";
import { bodyMobileTablet1 } from "../../typography";

const Output: React.FC<{ version_id: string }> = (props) => {
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
				<Viewer versionId={props.version_id} />
			</MainDiv>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	display: flex;
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

const TwoButton = styled.button``;

const ThreeButton = styled.button``;

const ViewCode = styled.button`
	margin-right: 16px;
	padding: 6px 12px;
	${bodyMobileTablet1}
	border-radius: 30px;
	background-color: ${colors.blue200};
	border: none;
	cursor: pointer;

	&:hover {
		background-color: ${colors.blue300};
	}
`;

const MainDiv = styled.div`
	display: flex;
	width: 100%;
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
