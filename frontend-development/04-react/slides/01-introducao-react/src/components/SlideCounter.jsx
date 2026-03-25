export default function SlideCounter({ current, total }) {
	return (
		<div className="slide-counter">
			<span>{current}</span> / <span>{total}</span>
		</div>
	);
}
