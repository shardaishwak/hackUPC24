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
import { useState } from "react";
import { useLanguage } from "@/i18n";

const Input: React.FC<{ onClick: (value: string) => void }> = (props) => {
	const { onClick } = props;
	const [inputValue, setInputValue] = useState("");

	const text: any = useLanguage(["write_a_prompt"]);

	const handleInputChange = (event) => {
		const value = event.target.textContent;
		setInputValue(value);
		updateImageFilter(value);
	};

	const updateImageFilter = (value) => {
		const img = document.getElementById("inputbutton");
		if (value.trim() === "") {
			img.style.filter = "grayscale(75%)";
		} else {
			img.style.filter = "none";
		}
	};

	return (
		<Container>
			<Container2 id="inputprompt">
				<InputField
					onInput={handleInputChange}
					type="text"
					id="inputfield"
					placeholder={text.write_a_prompt}
					contentEditable="true"
				></InputField>
				<PlaceholderStyle />
				<Img
					onClick={() => onClick(inputValue)}
					id="inputbutton"
					src="/arrow.png"
				/>
			</Container2>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 80px;
	justify-content: center;
`;

const Container2 = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	border: 2px solid ${colors.blue100};
	border-radius: 16px;
	overflow-y: auto;
`;

const InputField = styled.div`
	width: 80%;
	max-height: 200px;
	padding-left: 8px;
	border: none;
	outline: none;
	background-color: rgba(255, 255, 255, 0.5);
	font-family: Inter;

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

export default Input;
