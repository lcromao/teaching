export default function Slide02() {
	const companies = [
		{
			name: "Facebook:",
			description:
				"O próprio criador utiliza React extensivamente em sua interface web e aplicativos móveis (React Native)",
		},
		{
			name: "Instagram:",
			description:
				"Usa React em partes do website e React Native para interface fluida e responsiva",
		},
		{
			name: "Netflix:",
			description:
				"Utiliza React para criar sua interface, contribuindo para navegação rápida e suave",
		},
		{
			name: "Airbnb:",
			description:
				"Reescreveu interfaces com React e usou React Native em aplicativos móveis",
		},
		{
			name: "Twitter:",
			description: "Partes da interface foram desenvolvidas usando React",
		},
		{
			name: "WhatsApp:",
			description: "Faz uso de tecnologias baseadas em React",
		},
	];

	return (
		<>
			<h1>Quem Usa React?</h1>
			<div className="companies">
				{companies.map((company, index) => (
					<div key={index} className="company-item">
						<span className="company-name">{company.name}</span>{" "}
						{company.description}
					</div>
				))}
			</div>
		</>
	);
}
