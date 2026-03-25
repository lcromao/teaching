# Composição de componentes com “children”

Agora você vai conhecer uma “prop” especial do React que pode ser usada em qualquer componente, a **children**, além de praticar ainda mais o conceito de componentização. Essa prop serve para que um componente seja capaz de aceitar outros componentes como filhos, daí o nome “children” (do inglês, “filhos”). Ela é muito importante, então preste bastante atenção.

1. Para essa aula iremos reaproveitar o projeto do exercício anterior, o componente Profile.
2. Imagine que queiramos criar um componente chamado “Title” para assim poder reaproveitá-lo em outros lugares além do Profile. Inicialmente poderíamos fazer algo assim:
    
    components/Title/index.jsx
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function Title(props) {
      return <h2 className={styles.wrapper}>{props.text}</h2>
    }
    ```
    
    components/Title/styles.module.css
    
    ```jsx
    .wrapper {
      margin: 1rem;
    }
    ```
    
    components/Profile/index.jsx
    
    ```jsx
    import Title from "../Title"
    import styles from "./styles.module.css"
    
    export default function Profile(props) {
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title text={props.name} />
          <div>{props.bio}</div>
          <div>{props.phone}</div>
          <div>{props.email}</div>
          <div className={styles.links}>
            <a href={props.githubUrl} target="_blank">GitHub</a>
            <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            <a href={props.twitterUrl} target="_blank">Twitter</a>
          </div>
        </div>
      )
    }
    ```
    
3. Funciona, mas essa estratégia tem um problema. Se o nosso componente precisa ser muito flexível, com conteúdos dinâmicos dentro dele, precisamos incluir novas props para cada coisa, o que em algum momento com certeza vai ser um problema.
4. Para resolver isso e nos permitir também incluir facilmente componentes filhos “dentro” do nosso componente usamos a prop especial “children”. Vamos ver como usá-la no componente Title:
    
    components/Title/index.jsx
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function Title(props) {
      return <h2 className={styles.wrapper}>{props.children}</h2>
    }
    ```
    
    components/Profile/index.jsx
    
    ```jsx
    import Title from "../Title"
    import styles from "./styles.module.css"
    
    export default function Profile(props) {
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>{props.name}</Title>
          <div>{props.bio}</div>
          <div>{props.phone}</div>
          <div>{props.email}</div>
          <div className={styles.links}>
            <a href={props.githubUrl} target="_blank">GitHub</a>
            <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            <a href={props.twitterUrl} target="_blank">Twitter</a>
          </div>
        </div>
      )
    }
    ```
    
5. Agora nós podemos incluir qualquer conteúdo dentro do Title e ele será renderizado como filho do <h2> usado no componente. Por exemplo:
    
    Obs.: repare que não precisamos alterar nada do componente Title em si e ele simplesmente funciona.
    
    components/Profile/index.jsx
    
    ```jsx
    import Title from "../Title"
    import styles from "./styles.module.css"
    
    export default function Profile(props) {
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>
            <span>{props.name}</span>
            <button>Follow</button>
          </Title>
          <div>{props.bio}</div>
          <div>{props.phone}</div>
          <div>{props.email}</div>
          <div className={styles.links}>
            <a href={props.githubUrl} target="_blank">GitHub</a>
            <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            <a href={props.twitterUrl} target="_blank">Twitter</a>
          </div>
        </div>
      )
    }
    ```
    
6. Para praticar um pouco mais o uso do children vamos criar outro componente chamado ProfileSection. Esse componente vai substituir as divs estilizadas com borda que temos no Profile. Crie os seguintes arquivos:
    
    components/Profile/ProfileSection/index.jsx
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function ProfileSection(props) {
      return <div className={styles.wrapper}>{props.children}</div>
    }
    ```
    
    components/Profile/ProfileSection/styles.module.css
    
    ```css
    .wrapper {
      border-top: solid 1px rgb(66, 140, 209);
      padding: 1rem 2.5rem;
    }
    ```
    
7. Agora inclua o ProfileSection no Profile:
    
    Obs.: repare que o ProfileSection possui apenas os estilos gerais, não os estilos da classe .links, portanto precisamos adicionar outro elemento com essa classe ou então passar o className como prop.
    
    ```jsx
    import Title from "../Title"
    import ProfileSection from "./ProfileSection"
    import styles from "./styles.module.css"
    
    export default function Profile(props) {
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>
            <span>Name: </span>
            {props.name}
            <button>Follow</button>
          </Title>
          <ProfileSection>{props.bio}</ProfileSection>
          <ProfileSection>{props.phone}</ProfileSection>
          <ProfileSection>{props.email}</ProfileSection>
          <ProfileSection>
    				<div className={styles.links}>
    	        <a href={props.githubUrl} target="_blank">GitHub</a>
    	        <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
    	        <a href={props.twitterUrl} target="_blank">Twitter</a>
    				</div>
          </ProfileSection>
        </div>
      )
    }
    ```
    
8. Por último, vamos criar um componente LinkButton para subsituir as tags <a>:
    
    src/components/LinkButton/index.jsx
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function LinkButton(props) {
      return (
        <a className={styles.wrapper} href={props.href} target="_blank">{props.children}</a>
      )
    }
    ```
    
    src/components/LinkButton/styles.module.css
    
    ```jsx
    .wrapper {
      background: rgb(66, 140, 209);
      background: linear-gradient(45deg, rgb(30, 112, 189) 10%, rgb(124, 212, 235) 100%);
      border-radius: .75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #fff;
      font-weight: 700;
      padding: .625rem;
      position: relative;
      bottom: 0;
      text-decoration: none;
      transition: .2s;
      width: 10rem;
    }
    
    .wrapper:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      bottom: .25rem;
    }
    ```
    
9. E inclua o LinkButton no lugar das tags <a>:
    
    ```jsx
    import LinkButton from "../LinkButton"
    import Title from "../Title"
    
    // ...
    
          <ProfileSection>{props.phone}</ProfileSection>
          <ProfileSection>{props.email}</ProfileSection>
          <ProfileSection>
            <div className={styles.links}>
              <LinkButton href={props.githubUrl}>GitHub</LinkButton>
              <LinkButton href={props.linkedinUrl}>LinkedIn</LinkButton>
              <LinkButton href={props.twitterUrl}>Twitter</LinkButton>
            </div>
          </ProfileSection>
        </div>
      )
    }
    ```