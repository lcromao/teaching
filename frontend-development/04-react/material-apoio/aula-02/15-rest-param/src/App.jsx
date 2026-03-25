import Profile from "./components/Profile";
import avatarImg from "./assets/avatar.jpg";

export default function App() {
	return (
		<div className="app">
			<Profile
				avatar={avatarImg}
				name="John Doe"
				bio="Full-stack javascript developer at Acme Inc."
				phone="+5511987654321"
				email="john.doe@email.com"
				githubUrl="https://github.com/johndoe"
				linkedinUrl="https://linkedin.com/in/johndoe"
				twitterUrl="https://twitter.com/johndoe"
			/>
		</div>
	);
}
