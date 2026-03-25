import { useState, useEffect } from "react";
import Slide from "./components/Slide";
import Navigation from "./components/Navigation";
import SlideCounter from "./components/SlideCounter";
import Slide01 from "./components/slides/Slide01";
import Slide02 from "./components/slides/Slide02";
import Slide03 from "./components/slides/Slide03";
import Slide04 from "./components/slides/Slide04";
import Slide05 from "./components/slides/Slide05";
import Slide06 from "./components/slides/Slide06";
import Slide07 from "./components/slides/Slide07";
import Slide08 from "./components/slides/Slide08";
import Slide09 from "./components/slides/Slide09";
import Slide10 from "./components/slides/Slide10";
import Slide11 from "./components/slides/Slide11";

const slides = [
	Slide01,
	Slide02,
	Slide03,
	Slide04,
	Slide05,
	Slide06,
	Slide07,
	Slide08,
	Slide09,
	Slide10,
	Slide11,
];

export default function App() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = slides.length;

	const changeSlide = (direction) => {
		setCurrentSlide((prev) => {
			const next = prev + direction;
			if (next < 0) return 0;
			if (next >= totalSlides) return totalSlides - 1;
			return next;
		});
	};

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === "ArrowLeft") changeSlide(-1);
			if (e.key === "ArrowRight") changeSlide(1);
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	return (
		<div className="presentation">
			<SlideCounter current={currentSlide + 1} total={totalSlides} />

			{slides.map((SlideComponent, index) => (
				<Slide key={index} isActive={index === currentSlide}>
					<SlideComponent />
				</Slide>
			))}

			<Navigation
				onPrev={() => changeSlide(-1)}
				onNext={() => changeSlide(1)}
				canGoPrev={currentSlide > 0}
				canGoNext={currentSlide < totalSlides - 1}
			/>
		</div>
	);
}
