import { ReactNode } from "react";

export interface Part {
	id?: string;
	name: string;
	image: string;
	purchasePrice: number;
	repairPrice: number;
}
export interface Vehicle {
	id: string;
	image: string;
	make: string;
	model: string;
	amount: number;
	issueDescription: string;
	status: string;
	repair: number[];
	replace: number[];
}

export interface PartCardProps {
	part: {
		name: string;
		image: string;
		purchasePrice: number;
		repairPrice: number;
	};
	onClick: () => void;
}

export interface ModalProps {
	isOpen: boolean;
	title: string;
	children: ReactNode;
	closeModal: () => void;
}

export interface Revenue {
	id: string;
	revenue: number;
}

export interface RevenueChartProps {
	data: Revenue[];
	dataKey: string;
}

export interface TransactionProps {
	transactions: Revenue[];
	dataKey: string;
}
