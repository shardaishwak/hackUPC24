import styled from "styled-components";

import colors from "../../colors";
import Viewer from "./Viewer";
import { bodyMobileTablet1 } from "../../typography";
import React from "react";
import Editor from "@/Editor";
import { useLanguage } from "@/i18n";

const Output: React.FC<{ version_id: string; code: string; type: string }> = (
	props
) => {
	const [showCode, setShowCode] = React.useState(false);
	const text: any = useLanguage(["view_code"]);

	return (
		<Container>
			<TopButtons>
				<ViewButtons>
					<TwoButton active={props.type === "2D"}>2D</TwoButton>

					<ThreeButton active={props.type === "3D"}>3D</ThreeButton>
				</ViewButtons>

				<ViewCode onClick={() => setShowCode(!showCode)}>
					{text.view_code}
				</ViewCode>
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
	padding-left: 8px;
	box-sizing: border-box;
	border-top-left-radius: 16px;
	border-bottom-left-radius: 16px;
`;

const TopButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 5%;
	padding: 8px 0;
`;

const ViewButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const ViewCode = styled.button<{ active?: boolean }>`
	margin-right: 16px;
	padding: 6px 12px;
	${bodyMobileTablet1}
	border-radius: 30px;
	background-color: ${colors.blue200};
	border: none;
	cursor: pointer;

	${(props) =>
		props.active &&
		`
		background-color: ${colors.black};
		color: white;
	`}
`;

const TwoButton = styled(ViewCode)`
	padding: 6px 16px;
`;

const ThreeButton = styled(ViewCode)`
	padding: 6px 16px;
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

export default Output;
