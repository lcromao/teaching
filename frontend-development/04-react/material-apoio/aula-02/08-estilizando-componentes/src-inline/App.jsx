// Importando o componente de uma pasta
import Title from "./components/Title";
// Importando o componente de um arquivo específico
import Subtitle from "./components/Subtitle";
import StatusText from "./components/StatusText";

export default function App() {
  return (
    <div
      style={{
        // Perceba que estamos utilizando camelCase para as propriedades CSS
        // Uma chave é do conteúdo dinâmico e a outra é do objeto da propriedade CSS
        backgroundColor: "#2c2c2d",
        display: "grid",
        minHeight: "100vh",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  );
}
