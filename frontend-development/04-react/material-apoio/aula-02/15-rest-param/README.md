# Props com Rest Param

Agora você irá conhecer um recurso muito útil das props, a possibilidade de passar qualquer prop de um componente pai para um componente filho.

1. Na aula anterior nós criamos o componente ProfileSection e tivemos que separar os estilos da classe .links em um outro componente:
    
    ```jsx
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
    
2. Mas existe uma forma de definirmos qualquer prop em um componente pai que criamos e passá-la diretamente para o componente que é retornado dentre dele, ou seja, passar uma prop no ProfileSection e ela ser passada diretamente para a div que ele retorna. Comece adicionando algumas propriedades extras diretamente no componente ProfileSection:
    
    Obs.: repare que **no React os atributos data- e aria- devem ser utilizados com hífen**, este é um caso especial e eles são os únicos onde podemos fazer isso.
    
    ```jsx
    // ...
          <ProfileSection>{props.phone}</ProfileSection>
          <ProfileSection>{props.email}</ProfileSection>
          <ProfileSection
            className={styles.links}
            id="links-section"
            data-test="some value"
            aria-label="social links"
          >
            <LinkButton href={props.githubUrl}>GitHub</LinkButton>
            <LinkButton href={props.linkedinUrl}>LinkedIn</LinkButton>
            <LinkButton href={props.twitterUrl}>Twitter</LinkButton>
          </ProfileSection>
        </div>
      )
    }
    ```
    
3. Ao inspecionar o código no navegador você vai ver que nada aconteceu com a div que envolve os links, ela tem apenas a classe wrapper. Para corrigirmos isso e passar automaticamente qualquer prop de ProfileSection para a div nós usamos o rest param:
    
    Obs.: repare que especificamente no caso do className usamos um formato diferente, pois se aplicarmos apenas o props.className o elemento ficará sem os estilos da classe wrapper.
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function ProfileSection(props) {
      return (
        <div
          {...props}
          className={`${styles.wrapper} ${props.className}`}
        >
          {props.children}
        </div>
      )
    }
    ```