export default function Navigation({ onPrev, onNext, canGoPrev, canGoNext }) {
	return (
		<div className="navigation">
			<button onClick={onPrev} disabled={!canGoPrev}>
				← Anterior
			</button>
			<button onClick={onNext} disabled={!canGoNext}>
				Próximo →
			</button>
		</div>
	);
}
