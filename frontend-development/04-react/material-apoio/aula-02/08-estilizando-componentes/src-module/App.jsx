// Importando o componente de uma pasta
import Title from "./components/Title";
// Importando o componente de um arquivo específico
import Subtitle from "./components/Subtitle";
import StatusText from "./components/StatusText";
import styles from "./App.module.css";

export default function App() {
  return (
    // Definimos a classe do elemento utilizando o objeto styles, que é o resultado da importação do arquivo CSS como módulo.
    <div className={styles.app}>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  );
}
