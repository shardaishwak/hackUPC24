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
import { useRecoilValue } from "recoil";
import { Document, userState } from "@/recoil";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { useLanguage } from "@/i18n";

const array_partitioning = (documents) => {
	// Get today's date
	let today = new Date();
	today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

	// Get yesterday's date
	let yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	// Get the start and end dates for this week
	let startOfThisWeek = new Date(today);
	startOfThisWeek.setDate(today.getDate() - today.getDay()); // Set to the first day of the week (Sunday)
	let endOfThisWeek = new Date(startOfThisWeek);
	endOfThisWeek.setDate(startOfThisWeek.getDate() + 6); // Set to the last day of the week (Saturday)

	// Get the start and end dates for last week
	let startOfLastWeek = new Date(startOfThisWeek);
	startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
	let endOfLastWeek = new Date(endOfThisWeek);
	endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);

	let todayDocuments: Array<Document> = [];
	let yesterdayDocuments: Array<Document> = [];
	let thisWeekDocuments: Array<Document> = [];
	let lastWeekDocuments: Array<Document> = [];

	// Iterate through documents and categorize each document based on its updated_at date
	documents.forEach((document) => {
		let updatedAt = new Date(document.updated_at);

		// Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
		updatedAt.setHours(0, 0, 0, 0);

		if (updatedAt.getTime() === today.getTime()) {
			todayDocuments.push(document);
		} else if (updatedAt.getTime() === yesterday.getTime()) {
			yesterdayDocuments.push(document);
		} else if (updatedAt >= startOfThisWeek && updatedAt <= endOfThisWeek) {
			thisWeekDocuments.push(document);
		} else if (updatedAt >= startOfLastWeek && updatedAt <= endOfLastWeek) {
			lastWeekDocuments.push(document);
		}
	});

	return {
		today: todayDocuments,
		yesterday: yesterdayDocuments,
		thisWeek: thisWeekDocuments,
		lastWeek: lastWeekDocuments,
	};
};

const Sidebar = (props) => {
	const db_user = useRecoilValue(userState);
	const documents = array_partitioning(db_user.documents);
	const { user, logout } = useAuth0();
	const { active_id } = props;

	const text: any = useLanguage([
		"new_doc",
		"today",
		"yesterday",
		"this_week",
		"last_week",
		"exit",
	]);
	return (
		<Container>
			<div>
				<Title>Framer AI</Title>
				{/** Add button */}
				<Link href={"/"} style={{ textDecoration: "none" }}>
					<CustomLink
						style={{
							marginLeft: 16,
							marginRight: 16,
							borderRadius: 16,
							background: colors.blue200,
							marginBottom: 24,
							fontWeight: 600,
						}}
						active={false}
					>
						{text.new_doc}
					</CustomLink>
				</Link>

				<Lister>
					{documents.today.length > 0 && (
						<Links>
							<Tag>{text.today}</Tag>
							{documents.today.map((document) => (
								<Link href={"/d/" + document._id} key={document._id}>
									<CustomLink active={document._id === active_id}>
										{document.title}
									</CustomLink>
								</Link>
							))}
						</Links>
					)}
					{documents.yesterday.length > 0 && (
						<Links>
							<Tag>{text.yesterday}</Tag>
							{documents.yesterday.map((document) => (
								<Link href={"/d/" + document._id} key={document._id}>
									<CustomLink active={document._id === active_id}>
										{document.title}
									</CustomLink>
								</Link>
							))}
						</Links>
					)}
					{documents.thisWeek.length > 0 && (
						<Links>
							<Tag>{text.this_week}</Tag>
							{documents.thisWeek.map((document) => (
								<Link href={"/d/" + document._id} key={document._id}>
									<CustomLink active={document._id === active_id}>
										{document.title}
									</CustomLink>
								</Link>
							))}
						</Links>
					)}
					{documents.lastWeek.length > 0 && (
						<Links>
							<Tag>{text.last_week}</Tag>
							{documents.lastWeek.map((document) => (
								<Link href={"/d/" + document._id} key={document._id}>
									<CustomLink active={document._id === active_id}>
										{document.title}
									</CustomLink>
								</Link>
							))}
						</Links>
					)}
				</Lister>
			</div>
			<UserContainer>
				<UserInfo>
					<Image
						src={user?.picture || "/women.jpg"}
						width={40}
						height={40}
						style={{ objectFit: "cover", borderRadius: 99 }}
						alt="User profile picture"
					/>
					<div>
						<UserText>{user?.name || user?.preferred_username}</UserText>
						<Exit onClick={() => logout()}>{text.exit}</Exit>
					</div>
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
	text-decoration: none;

	a {
		text-decoration: none;
	}
`;

const Tag = styled.p`
	${bodyMobileTablet3}
	text-transform: uppercase;
	opacity: 0.4;
	margin-left: 16px;
	margin-bottom: 8px;
`;

const CustomLink = styled.p<{ active?: boolean }>`
	${bodyMobileTablet1}
	text-decoration: none;
	${limitLines(1)}
	padding: 4px 0;
	padding-left: 16px;
	margin-right: 4px;
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
	color: ${colors.black};
	text-decoration: none;

	${(props) =>
		props.active &&
		`
		background: ${colors.blue200};
		
	`}

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
	${bodyMobileTablet1}
	font-weight: 600;
	text-transform: capitalize;
`;

const Exit = styled.p`
	${bodyMobileTablet2}
	color: ${colors.blue700};
	cursor: pointer;
`;

export default Sidebar;
