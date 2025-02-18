const backendURL = "http://localhost:8000"

import { Part, Vehicle } from "./interface"

export async function fetchRevenue(selectedIndex: number) {
	const url = `${backendURL}/api/revenue/${selectedIndex}/`
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		});

		if (response.status != 200) console.error(response.json());

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
};

export async function fetchParts() {
	const url = `${backendURL}/api/parts/view/`
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		});

		if (response.status != 200) console.error(response.json())

		return await response.json();
	} catch (error) {
		console.error("Error fetching part data:", error);
	}
};

export async function fetchVehicles() {
	const url = `${backendURL}/api/vehicles/view/`
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		});

		if (response.status != 200) console.error(response.json());

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
};

export async function registerPart(part: Part) {
	const url = `${backendURL}/api/parts/register/`
	console.log(part)
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name: part.name,
				image: part.image,
				purchasePrice: part.purchasePrice,
				repairPrice: part.repairPrice
			}),
		});

		if (response.status != 200) console.error(response.json());

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
}

export async function registerVehicle(vehicle: Vehicle) {
	const url = `${backendURL}/api/vehicles/register/`
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				id: vehicle.id,
				image: vehicle.image,
				make: vehicle.make,
				model: vehicle.model,
				amount: vehicle.amount,
				issueDescription: vehicle.issueDescription,
				repair: vehicle.repair,
				replace: vehicle.replace,
				status: vehicle.status,
			})
		});

		if (response.status != 200) console.error(response.json());

		return await response.json();
	} catch (error) {
		console.error("Error fetching revenue data:", error);
	}
}
