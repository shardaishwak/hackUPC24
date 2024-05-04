import styled from "styled-components";
import { bodyDesktop3, heading6 } from "../../typography";
import React from "react";
import Image from "next/image";

const UserBlock: React.FC<{
	image: string;
	agent: string;
	value: string;
	onClick?: (value: string) => void;
}> = (props) => {
	const { image, agent, value, onClick } = props;

	const body = <Body>{value}</Body>;
	return (
		<Container>
			<Image
				src={image}
				alt="user"
				style={{
					objectFit: "cover",
					borderRadius: 40,
					border: "1px solid rgba(0,0,0,.1)",
				}}
				width={40}
				height={40}
			/>
			<div>
				<Text1>{agent}</Text1>
				<Body onClick={onClick}>{value}</Body>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: start;
	gap: 12px;
`;

const Text1 = styled.p`
	${heading6}
	margin-bottom: 8px;
`;

const Body = styled.p`
	${bodyDesktop3}
`;

export default UserBlock;
