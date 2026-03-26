import styles from "./styles.module.css";
import Title from "../Title";
import ProfileSection from "./ProfileSection";
import LinkButton from "../LinkButton";
import { useState } from "react";

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
  // let followButtonText = "Follow";
  const [followText, setFollowText] = useState("Follow"); // (Valor, função para atualizar o valor)
  function handleClick() {
    alert("Feito!");
    // Não posso só alterar a variável...
    // followButtonText = "Following";
    // Para alterar o texto do botão, preciso usar um estado
    setFollowText("Following"); // (Novo valor do estado)
  }
  return (
    <article className={styles.profile}>
      <img className={styles.avatar} src={avatar} alt={name} />
      <Title>
        {name}
        <button className={styles.followButton} onClick={handleClick}>
          {followText}
        </button>
      </Title>
      <ProfileSection>{bio}</ProfileSection>
      <ProfileSection>{email}</ProfileSection>
      <ProfileSection>{phone}</ProfileSection>
      <ProfileSection
        className={styles.links}
        id="social-links"
        data-test="social-links-data"
        aria-label="Social Links"
      >
        <LinkButton href={githubUrl}>GitHub</LinkButton>
        <LinkButton href={linkedinUrl}>LinkedIn</LinkButton>
        <LinkButton href={twitterUrl}>Twitter</LinkButton>
      </ProfileSection>
    </article>
  );
}
