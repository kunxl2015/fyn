import { useState, useEffect } from "react";
import { Modal, VehicleCard } from "../components/";
import { fetchVehicles, fetchParts, registerVehicle } from "../utils/api";
import { Button } from "@headlessui/react";
import { Part, Vehicle } from "../utils/interface";
import PartSelector from "../components/partselector";

export default function VehiclesPage() {
	const [parts, setParts] = useState<Part[]>([]);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	const [selectedRepairParts, setSelectedRepairParts] = useState<Part[]> ([])
	const [selectedReplaceParts, setSelectedReplaceParts] = useState<Part[]> ([])

	const [vehicle, setVehicle] = useState<Vehicle | null>(null)
	const [newVehicle, setNewVehicle] = useState<Vehicle>({
		id: "",
		make: "",
		model: "",
		image: "",
		amount: 0,
		status: "Pending",
		issueDescription: "Hello World",
		repair: [],
		replace: []
	})

	const [isAddModalOpen, setAddModalOpen] = useState(false)
	const [isViewModalOpen, setViewModalOpen] = useState(false)

	useEffect(() => {
		fetchVehicles()
			.then(vehicle => setVehicles(vehicle))
			.catch(error => console.error(error))

		fetchParts()
			.then(part => setParts(part))
			.catch(error => console.error(error))
	}, []);

	useEffect(() => {
	 const repairCost = selectedRepairParts.reduce((sum, part) => sum + part.repairPrice, 0);
	 const replaceCost = selectedReplaceParts.reduce((sum, part) => sum + part.purchasePrice, 0);

	 setNewVehicle(prev => ({
		...prev,
		amount: repairCost + replaceCost
	 }))
	}, [selectedRepairParts, selectedReplaceParts]);

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();

			if(file){
				reader.readAsDataURL(file)
			}

			reader.onload = () => {
				setNewVehicle((prev) => ({
					...prev,
					image: reader.result as string
				}))
			}
		}
	}

	function addVehicle() {
		registerVehicle(newVehicle)
		window.location.reload()
	}

	function openViewMoal(vehicle: Vehicle) {
		setVehicle(vehicle)
		setViewModalOpen(true)
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4 text-center">Vehicles</h1>
			<button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto" onClick={() => setAddModalOpen(true)}>
				Add Vehicle
			</button>

			<div className="mb-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{vehicles.map(vehicle => (
						<VehicleCard vehicle={vehicle} onClick={() => openViewMoal(vehicle)} />
					))}
				</div>
			</div>

			<Modal isOpen={isViewModalOpen} closeModal={() => setViewModalOpen(false)} title={vehicle?.model ?? "View Part"}>
				<img src={`http://localhost:8000/${vehicle?.image}`} alt={vehicle?.id}
				className="w-full h-40 object-cover rounded" />
				<p className="mt-2">Amount: {vehicle?.amount}</p>
			</Modal>

            <Modal isOpen={isAddModalOpen} closeModal={() => setAddModalOpen(false)} title="Add Vehicle">
				<input
					type="text"
					placeholder="ID"
					className="border p-2 w-full mt-2"
					value={newVehicle.id}
					onChange={(e) => setNewVehicle(prev => ({
						...prev,
						id: e.target.value
					}))}
				/>

				<input
					type="text"
					placeholder="Make"
					className="border p-2 w-full mt-2"
					value={newVehicle.make}
					onChange={(e) => setNewVehicle(prev => ({
						...prev,
						make: e.target.value
					}))}
				/>

				<input
					type="text"
					placeholder="Model"
					className="border p-2 w-full mt-2"
					value={newVehicle.model}
					onChange={(e) => setNewVehicle(prev => ({
						...prev,
						model: e.target.value
					}))}
				/>

				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="border p-2 w-full mt-2"
				/>

				{newVehicle.image && (
					<div className="mt-2">
						<img src={newVehicle.image} alt="Part"
						className="w-full h-40 object-cover rounded" />
					</div>
				)}

				<PartSelector
					title="Repairable Part"
					parts={parts}
					priceKey="repairPrice"
					selectedParts={selectedRepairParts}
					setSelectedParts={setSelectedRepairParts}
				/>

				<PartSelector
					title="Replacable Part"
					parts={parts}
					priceKey="purchasePrice"
					selectedParts={selectedReplaceParts}
					setSelectedParts={setSelectedReplaceParts}
				/>

				<p className="text-lg font-semibold mt-4">Total Price: ${newVehicle.amount}</p>
				<Button onClick={addVehicle} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">
					Add
				</Button>
			</Modal>
		</div>
	);
}
