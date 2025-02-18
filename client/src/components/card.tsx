interface PartCardProps {
	part: {
		name: string;
		image: string;
		purchasePrice: number;
		repairPrice: number;
	};
	onClick: () => void;
}

export default function Card({ part, onClick }: PartCardProps) {
	return (
		<div className="border rounded-lg p-4 shadow-md cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
			<img src={`http://localhost:8000/${part?.image}`} alt={part?.name} className="w-full h-32 object-cover rounded" />
			<h2 className="text-lg font-semibold mt-2">{part?.name}</h2>
			<p className="text-sm text-gray-600">Purchase Price: ${part?.purchasePrice}</p>
			<p className="text-sm text-gray-600">Repair Price: ${part?.repairPrice}</p>
		</div>
	);
}
