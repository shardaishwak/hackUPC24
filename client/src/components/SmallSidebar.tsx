import styled from "styled-components";
import { heading6 } from "../../typography";
import colors from "../../colors";

const SmallSidebar: React.FC<{
	versions_count: number;
	active_version: number;
	onSelect: (index: number) => void;
}> = (props) => {
	const { versions_count, active_version, onSelect } = props;
	return (
		<Container>
			{Array.from({ length: versions_count }).map((_, index) => (
				<Button
					onSelect={() => onSelect(index)}
					key={index}
					active={index === active_version}
				>
					{index + 1}
				</Button>
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;
	height: 100vh;
`;

const Button = styled.button<{ active?: boolean }>`
	border: none;
	outline: none;
	${heading6}
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${colors.blue200};
	border-radius: 8px;
	cursor: pointer;

	color: black;

	&:hover {
		background-color: ${colors.blue300};
	}

	${(props) =>
		props.active &&
		`
        background: ${colors.instagram_gradient};
        color: white
    `}
`;

export default SmallSidebar;
