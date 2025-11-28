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

const loginUser = async () => {
	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;
	payload = {
		email: email,
		password: password,
	};

	let url = "http://127.0.0.1:8000/auth/login";
	fetch(url, {
		method: "post",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem("token", data.access_token);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
