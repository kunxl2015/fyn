import { useEffect, useState } from "react";
import { Card, Modal } from "../components";
import { Button } from "@headlessui/react";
import { fetchParts, registerPart } from "../utils/api";

interface Part {
	name: string;
	image: string;
	purchasePrice: number;
	repairPrice: number;
}

export default function PartsPage() {
	const [parts, setParts] = useState<Part[]>([]);
	const [part, setPart] = useState<Part>({
		name: "",
		image: "",
		purchasePrice: 0,
		repairPrice: 0,
	});
	const [selectedPart, setSelectedPart] = useState<Part | null>(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	useEffect(() => {
		fetchParts()
			.then((response) => {
				setParts(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setPart((prev) => ({
			...prev,
			[name]: name === "purchasePrice" || name === "repairPrice" ? parseFloat(value) || 0 : value,
		}));
	}

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();

			if(file){
				reader.readAsDataURL(file)
			}

			reader.onload = () => {
				setPart((prev) => ({
					...prev,
					image: reader.result as string
				}))
			}
		}
	}

	function addPart() {
		registerPart(part);
		window.location.reload()
	}

	function openViewModal(part: Part) {
		setSelectedPart(part);
		setIsViewModalOpen(true);
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4 text-center">Parts</h1>
			<button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
				Add Part
			</button>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{parts?.map((part, index) => (
					<Card key={index} part={part} onClick={() => openViewModal(part)} />
				))}
			</div>

			<Modal isOpen={isViewModalOpen} closeModal={() => setIsViewModalOpen(false)} title={selectedPart?.name ?? "View Part"}>
			<img src={`http://localhost:8000/${selectedPart?.image}`} alt={selectedPart?.name} className="w-full h-40 object-cover rounded" />
				<p className="mt-2">Purchase Price: {selectedPart?.purchasePrice}</p>
				<p>Repair Price: {selectedPart?.repairPrice}</p>
			</Modal>

			<Modal isOpen={isAddModalOpen} closeModal={() => setIsAddModalOpen(false)} title="Add Part">
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={part.name}
					onChange={handleChange}
					className="border p-2 w-full mt-2"
				/>

				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="border p-2 w-full mt-2"
				/>

				{part.image && (
					<div className="mt-2">
						<img src={part.image} alt="Part" className="w-full h-40 object-cover rounded" />
					</div>
				)}

				<input
					type="number"
					placeholder="Purchase Price"
					name="purchasePrice"
					value={part.purchasePrice}
					onChange={handleChange}
					className="border p-2 w-full mt-2"
				/>
				<input
					type="number"
					placeholder="Repair Price"
					name="repairPrice"
					value={part.repairPrice}
					onChange={handleChange}
					className="border p-2 w-full mt-2"
				/>
				<Button onClick={addPart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">
					Add
				</Button>
			</Modal>
		</div>
	);
}
