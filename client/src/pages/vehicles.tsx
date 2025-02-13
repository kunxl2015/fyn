import { useState, Fragment } from "react";
import { Dialog, Transition, Button } from "@headlessui/react";

const dummyVehicles = [
	{
		id: 1,
		name: "Tesla Model S",
		image: "https://via.placeholder.com/150",
		price: "$80,000",
		status: "Available",
	},
	{
		id: 2,
		name: "Ford Mustang",
		image: "https://via.placeholder.com/150",
		price: "$55,000",
		status: "In Service",
	},
	{
		id: 3,
		name: "BMW X5",
		image: "https://via.placeholder.com/150",
		price: "$70,000",
		status: "Sold",
	},
];

export default function VehiclesPage() {
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (vehicle) => {
		setSelectedVehicle(vehicle);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setSelectedVehicle(null);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Vehicles</h1>
			<Button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add Vehicle</Button>
			<div className="grid grid-cols-3 gap-4">
				{dummyVehicles.map((vehicle) => (
					<div
						key={vehicle.id}
						className="border rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition"
						onClick={() => openModal(vehicle)}
					>
						<img src={vehicle.image} alt={vehicle.name} className="w-full h-24 object-cover rounded" />
						<h2 className="text-lg font-semibold mt-2">{vehicle.name}</h2>
						<p className="text-sm text-gray-600">Price: {vehicle.price}</p>
						<p className={`text-sm font-semibold ${vehicle.status === "Available" ? "text-green-600" : "text-red-600"}`}>
							Status: {vehicle.status}
						</p>
					</div>
				))}
			</div>

			{/* Modal */}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
								{selectedVehicle && (
									<>
										<Dialog.Title className="text-xl font-bold">{selectedVehicle.name}</Dialog.Title>
										<img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-40 object-cover rounded mt-2" />
										<p className="mt-2">Price: {selectedVehicle.price}</p>
										<p>Status: {selectedVehicle.status}</p>
										<Button
											className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
											onClick={closeModal}
										>
											Close
										</Button>
									</>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
