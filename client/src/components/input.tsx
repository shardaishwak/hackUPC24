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
import React, { useState } from "react";
import { useLanguage } from "@/i18n";
import { IoMdReturnRight } from "react-icons/io";

const Input: React.FC<{
	onClick: (value: string, type: string) => void;
	hideType?: boolean;
	loading?: boolean;
}> = (props) => {
	const { onClick } = props;
	const [inputValue, setInputValue] = useState("");
	const [type, setType] = useState("2D");

	const ref = React.useRef(null);

	const text: any = useLanguage(["write_a_prompt"]);

	const handleInputChange = (event) => {
		const value = event.target.textContent;
		setInputValue(value);
	};

	return (
		<Container>
			<Container2 id="inputprompt">
				{!props.hideType && (
					<ViewButtons>
						<TwoButton onClick={() => setType("2D")} active={type === "2D"}>
							2D
						</TwoButton>

						<TwoButton onClick={() => setType("3D")} active={type === "3D"}>
							3D
						</TwoButton>
					</ViewButtons>
				)}
				<InputField
					onInput={handleInputChange}
					id="inputfield"
					placeholder={text.write_a_prompt}
					contentEditable="true"
					style={{ marginLeft: !props.hideType ? 4 : 0 }}
					ref={ref}
				></InputField>
				<PlaceholderStyle />

				<Button
					onClick={() => {
						onClick(inputValue, type);
						setInputValue("");
						if (ref?.current?.textContent) ref.current.textContent = "";
					}}
				>
					{props.loading ? (
						"Loading..."
					) : (
						<IoMdReturnRight color="white" size={16} />
					)}
				</Button>
			</Container2>
		</Container>
	);
};

const ViewButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	margin-left: 8px;
	margin-right: 12px;
`;

const ViewCode = styled.button<{ active?: boolean }>`
	padding: 6px 12px;
	${bodyMobileTablet1}
	border-radius: 30px;
	background-color: ${colors.blue200};
	border: none;
	cursor: pointer;

	&:hover {
		background-color: ${colors.blue300};
	}

	${(props) =>
		props.active &&
		`
		background-color: ${colors.black};
		color: white;

		&:hover {
			background-color: ${colors.black}a8;
		
			color: white
		}
	`}
`;
const TwoButton = styled(ViewCode)`
	padding: 6px 16px;
`;

const Container = styled.div`
	display: flex;
	max-height: 200px;
	flex-direction: column;
	width: 100%;
	justify-content: flex-end;
	align-items: flex-end;
`;

const Container2 = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
	border: 2px solid ${colors.blue100};
	border-radius: 24px;
	overflow-y: auto;
	padding: 6px 0;
	margin-top: 12px;
`;

const InputField = styled.div`
	width: 80%;
	max-height: 200px;
	padding-left: 8px;
	border: none;
	outline: none;
	background-color: rgba(255, 255, 255, 0.5);
	font-family: Inter;
	min-height: 26px;

	&[placeholder]:empty:before {
		content: attr(placeholder);
		color: rgba(0, 0, 0, 0.2);
		cursor: text;
	}
`;

const Img = styled.img`
	display: flex;
	height: 30px;
	width: 30px;
	padding: 8px;
`;

const PlaceholderStyle = styled.img`
	::placeholder {
		color: ${colors.blue100};
		font-family: Arial, sans-serif;
	}
`;

const Button = styled.div`
	padding: 0 12px;
	height: 32px;
	border-radius: 999px;
	flex-shrink: 0;
	background-color: black;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 8px;
	cursor: pointer;
`;

export default Input;
