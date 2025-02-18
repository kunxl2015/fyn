import React from "react";
import { Part } from "../utils/interface"

interface PartSelectorProps {
    title: string;
    parts: Part[];
    selectedParts: Part[];
    setSelectedParts: React.Dispatch<React.SetStateAction<Part[]>>;
    priceKey: "repairPrice" | "purchasePrice";
}

function PartSelector({ title, parts, selectedParts, setSelectedParts, priceKey }: PartSelectorProps) {
	function togglePartSelection (part: Part){
		if (selectedParts.find(p => p.id === part.id)) {
			setSelectedParts(selectedParts.filter(p => p.id !== part.id));
		} else {
			setSelectedParts([...selectedParts, part]);
		}
	};

	return (
		<div>
			<h3 className="text-lg font-semibold mt-4">{title}</h3>
			<div className="relative border rounded p-2 cursor-pointer bg-white">
				<div className="flex flex-wrap gap-2">
					{selectedParts.map(part => (
						<span key={part.id} className="bg-gray-200 px-2 py-1 rounded flex items-center">
							{part.name} (${part[priceKey]})
							<button className="ml-2 text-red-500" onClick={() => togglePartSelection(part)}>×</button>
						</span>
					))}
				</div>
				<ul className="mt-2 border rounded bg-white max-h-40 overflow-y-auto">
					{parts.map(part => (
						<li
							key={part.id}
							className={`p-2 cursor-pointer ${selectedParts.find(p => p.id === part.id) ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
							onClick={() => togglePartSelection(part)}
						>
							{part.name} (${part[priceKey]})
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PartSelector;
