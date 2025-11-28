import styles from "./styles.module.css";

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
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.bio}>{bio}</p>
			<p className={styles.phone}>{phone}</p>
			<p className={styles.email}>{email}</p>
			<nav className={styles.links}>
				<a
					href={githubUrl}
					target="_blank"
					rel="noreferrer"
					className={styles.button}>
					GitHub
				</a>
				<a
					href={linkedinUrl}
					target="_blank"
					rel="noreferrer"
					className={styles.button}>
					LinkedIn
				</a>
				<a
					href={twitterUrl}
					target="_blank"
					rel="noreferrer"
					className={styles.button}>
					Twitter
				</a>
			</nav>
		</article>
	);
}
