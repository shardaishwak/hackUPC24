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

const Sidebar = () => {
	const db_user = useRecoilValue(userState);
	const documents = array_partitioning(db_user.documents);
	const { user } = useAuth0();
	return (
		<Container>
			<div>
				<Title>Framer Ai</Title>
				{/** Add button */}

				<Lister>
					{documents.today.length > 0 && (
						<Links>
							<Tag>Today</Tag>
							{documents.today.map((document) => (
								<CustomLink key={document._id} href={"/d/" + document._id}>
									{document.title}
								</CustomLink>
							))}
						</Links>
					)}
					{documents.yesterday.length > 0 && (
						<Links>
							<Tag>Yesterday</Tag>
							{documents.yesterday.map((document) => (
								<CustomLink key={document._id} href={"/d/" + document._id}>
									{document.title}
								</CustomLink>
							))}
						</Links>
					)}
					{documents.thisWeek.length > 0 && (
						<Links>
							<Tag>This Week</Tag>
							{documents.thisWeek.map((document) => (
								<CustomLink key={document._id} href={"/d/" + document._id}>
									{document.title}
								</CustomLink>
							))}
						</Links>
					)}
					{documents.lastWeek.length > 0 && (
						<Links>
							<Tag>Last Week</Tag>
							{documents.lastWeek.map((document) => (
								<CustomLink key={document._id} href={"/d/" + document._id}>
									{document.title}
								</CustomLink>
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
