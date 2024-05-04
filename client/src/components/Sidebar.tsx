import styled from "styled-components";
import {
	bodyMobileTablet1,
	bodyMobileTablet2,
	bodyMobileTablet3,
	heading1,
	limitLines,
} from "../../typography";
import colors from "../../colors";
import Image from "next/image";

const Sidebar = () => {
	return (
		<Container>
			<div>
				<Title>Framer Ai</Title>
				<Lister>
					<Links>
						<Tag>Pages</Tag>
						<CustomLink href="#">Genreate a framer game</CustomLink>
						<CustomLink href="#">
							Simulate per percolation of objects
						</CustomLink>
						<CustomLink href="#">Imagine a car moving in the bot</CustomLink>
					</Links>
					<Links>
						<Tag>Pages</Tag>
						<CustomLink href="#">Genreate a framer game</CustomLink>
						<CustomLink href="#">
							Simulate per percolation of objects
						</CustomLink>
						<CustomLink href="#">Imagine a car moving in the bot</CustomLink>
					</Links>
				</Lister>
			</div>
			<UserContainer>
				<UserInfo>
					<Image
						src="/women.jpg"
						width={40}
						height={40}
						style={{ objectFit: "cover", borderRadius: 99 }}
					/>
					<UserText>John Doe</UserText>
				</UserInfo>
			</UserContainer>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${colors.blue100};
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
`;

const Title = styled.h1`
	${heading1}
	padding: 16px;
`;

const Lister = styled.div`
	overflow-y: auto;
`;

const Links = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin-top: 16px;
`;

const Tag = styled.p`
	${bodyMobileTablet3}
	text-transform: uppercase;
	opacity: 0.4;
	margin-left: 16px;
	margin-bottom: 8px;
`;

const CustomLink = styled.a`
	${bodyMobileTablet1}
	text-decoration: none;
	${limitLines(1)}
	padding: 4px 0;
	padding-left: 16px;
	margin-right: 4px;
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
	color: ${colors.black};

	&:hover {
		background: ${colors.blue200};
	}
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 0 16px;
	gap: 8px;
`;

const UserText = styled.p`
	${bodyMobileTablet2}
`;

export default Sidebar;
