export default function Slide({ children, isActive }) {
	return <div className={`slide ${isActive ? "active" : ""}`}>{children}</div>;
}
