const postUser = async () => {
	let user = document.getElementById("user").value;
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	payload = {
		name: user,
		email: email,
		password: password,
	};

	let url = "http://127.0.0.1:8000/auth/signup";
	fetch(url, {
		method: "post",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error("Error:", error);
		});
};
