import styles from "./styles.module.css";

export default function LinkButton(props) {
	return (
		<a href={props.href} target="_blank" className={styles.wrapper}>
			{props.children}
		</a>
	);
}
