import styles from "./styles.module.css";
import Title from "../Title";
import ProfileSection from "./ProfileSection";
import LinkButton from "../LinkButton";

export default function Profile({
	avatar,
	name,
	bio,
	email,
	phone,
	githubUrl,
	linkedinUrl,
	twitterUrl,
}) {
	return (
		<article className={styles.profile}>
			<img className={styles.avatar} src={avatar} alt={name} />
			<Title>
				{name}
				<button>Follow Me!</button>
			</Title>
			<ProfileSection>{bio}</ProfileSection>
			<ProfileSection>{email}</ProfileSection>
			<ProfileSection>{phone}</ProfileSection>
			<ProfileSection
				// Quero passar esses atributos para a div do ProfileSection
				className={styles.links}
				id="social-links"
				// Somente nos atributos data e aria que são permitidos hifens
				data-test="social-links-data"
				aria-label="Social Links">
				<LinkButton href={githubUrl}>GitHub</LinkButton>
				<LinkButton href={linkedinUrl}>LinkedIn</LinkButton>
				<LinkButton href={twitterUrl}>Twitter</LinkButton>
			</ProfileSection>
		</article>
	);
}
