import { useState, Fragment } from "react";
import { Dialog, Transition, Button } from "@headlessui/react";

const dummyParts = [
	{
		id: 1,
		name: "Brake Pad",
		image: "https://via.placeholder.com/150",
		purchasePrice: "$50",
		repairPrice: "$20",
	},
	{
		id: 2,
		name: "Engine Oil",
		image: "https://via.placeholder.com/150",
		purchasePrice: "$30",
		repairPrice: "$10",
	},
	{
		id: 3,
		name: "Air Filter",
		image: "https://via.placeholder.com/150",
		purchasePrice: "$25",
		repairPrice: "$8",
	},
];

export default function PartsPage() {
	const [selectedPart, setSelectedPart] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (part) => {
		setSelectedPart(part);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setSelectedPart(null);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Parts</h1>
			<Button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add Part</Button>
			<div className="grid grid-cols-3 gap-4">
				{dummyParts.map((part) => (
					<div
						key={part.id}
						className="border rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition"
						onClick={() => openModal(part)}
					>
						<img src={part.image} alt={part.name} className="w-full h-24 object-cover rounded" />
						<h2 className="text-lg font-semibold mt-2">{part.name}</h2>
						<p className="text-sm text-gray-600">Purchase Price: {part.purchasePrice}</p>
						<p className="text-sm text-gray-600">Repair Price: {part.repairPrice}</p>
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
								{selectedPart && (
									<>
										<Dialog.Title className="text-xl font-bold">{selectedPart.name}</Dialog.Title>
										<img src={selectedPart.image} alt={selectedPart.name} className="w-full h-40 object-cover rounded mt-2" />
										<p className="mt-2">Purchase Price: {selectedPart.purchasePrice}</p>
										<p>Repair Price: {selectedPart.repairPrice}</p>
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
