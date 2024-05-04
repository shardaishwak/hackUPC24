import styled from "styled-components";

import colors from "../../colors";
import Viewer from "./Viewer";
import { bodyMobileTablet1 } from "../../typography";
import React from "react";
import Editor from "@/Editor";

const Output: React.FC<{ version_id: string; code: string }> = (props) => {
	const [showCode, setShowCode] = React.useState(false);

	return (
		<Container>
			<TopButtons>
				<ViewButtons>
					<TwoButton>2D</TwoButton>

					<ThreeButton>3D</ThreeButton>
				</ViewButtons>

				<ViewCode onClick={() => setShowCode(!showCode)}>View Code</ViewCode>
			</TopButtons>

			<MainDiv>
				{showCode ? (
					<div style={{ overflow: "auto", width: "100%", height: "100%" }}>
						<Editor code={props.code} />
					</div>
				) : (
					<Viewer versionId={props.version_id} />
				)}
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

const TwoButton = styled(ViewCode)``;

const ThreeButton = styled(ViewCode)``;

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
