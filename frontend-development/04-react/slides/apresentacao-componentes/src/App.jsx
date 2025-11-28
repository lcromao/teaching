import { useState, useEffect } from "react";
import Slide from "./components/Slide/Slide";
import { slides } from "./data/slides";
import styles from "./App.module.css";

function App() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		if (currentSlide < slides.length - 1) {
			setCurrentSlide(currentSlide + 1);
		}
	};

	const prevSlide = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		}
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			const key = event.key;
			if (key === "ArrowRight" || key === "PageDown" || key === " ") {
				event.preventDefault();
				nextSlide();
			} else if (key === "ArrowLeft" || key === "PageUp") {
				event.preventDefault();
				prevSlide();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [currentSlide]);

	const progress = ((currentSlide + 1) / slides.length) * 100;

	return (
		<div className={styles.deck} aria-label="Apresentação Componentes React">
			<header className={styles.deckHeader}>
				<div className={styles.deckHeaderLeft}>
					<span className={styles.deckLogo}></span>
					<span className={styles.deckTitle}>Componentes React</span>
				</div>
				<div className={styles.deckHeaderRight}>
					<span className={styles.hint}>Navegue com</span>
					<span className={styles.kbd}>←</span>
					<span className={styles.kbd}>→</span>
					<span className={styles.kbd}>Space</span>
				</div>
			</header>

			<main className={styles.deckMain}>
				{slides.map((slide, index) => (
					<Slide
						key={index}
						title={slide.title}
						subtitle={slide.subtitle}
						isActive={index === currentSlide}
						isFull={slide.isFull}>
						{slide.content}
					</Slide>
				))}
			</main>

			<footer className={styles.deckFooter}>
				<div className={styles.progress} aria-hidden="true">
					<div
						className={styles.progressBar}
						style={{ width: `${progress}%` }}></div>
				</div>
				<div className={styles.pager}>
					{currentSlide + 1} / {slides.length}
				</div>
				<div className={styles.navButtons}>
					<button
						className={styles.btn}
						onClick={prevSlide}
						disabled={currentSlide === 0}>
						<span className={styles.btnIcon}>←</span> Anterior
					</button>
					<button
						className={`${styles.btn} ${styles.btnPrimary}`}
						onClick={nextSlide}
						disabled={currentSlide === slides.length - 1}>
						Próximo <span className={styles.btnIcon}>→</span>
					</button>
				</div>
			</footer>
		</div>
	);
}

export default App;
