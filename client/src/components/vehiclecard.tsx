interface VehicleCardProps {
	vehicle: {
		id: string;
		make: string;
		model: string;
		image: string;
		amount: number;
	};
	onClick: () => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
	return (
		<div
		className="border rounded-lg p-4 shadow-md cursor-pointer transition-transform transform hover:scale-105"
		onClick={onClick}
		>
		<img
			src={`http://localhost:8000/${vehicle?.image}`}
			alt={`${vehicle?.make} ${vehicle?.model}`}
			className="w-full h-32 object-cover rounded"
		/>
		<h2 className="text-lg font-semibold mt-2">{`${vehicle?.make} ${vehicle?.model}`}</h2>
		<p className="text-sm text-gray-600 mt-1">Amount: ${vehicle?.amount}</p>
		</div>
	);
}
