const backendURL = "http://localhost:8000"

export async function fetchRevenue(selectedIndex: number) {
	const url = `${backendURL}/api/revenue/${selectedIndex}/`
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		});

		if (response.status != 200) console.error("Error fetching revenue data");

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
};

export async function fetchParts() {
	const url = `${backendURL}/api/parts/view`
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		});

		if (response.status != 200) console.error("Error fetching revenue data");

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
};
