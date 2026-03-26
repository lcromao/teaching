// Estados tornam-se propos
export default function Input({ passwordSize, setPasswordSize }) {
  return (
    <input
      type="number"
      id="passwordSize"
      min={1}
      value={passwordSize}
      onChange={(ev) => setPasswordSize(ev.target.value)}
    />
  );
}
