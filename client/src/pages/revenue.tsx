import { Tab, TabPanels, TabPanel, TabList, TabGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import { fetchRevenue } from "../utils/api";

export default function RevenuePage() {
	const [data, setData] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		fetchRevenue(selectedIndex).then(response => {
			setData(response)
		}).catch(error => {
			console.error("Error in fetch revenue", error)
		})
	}, [selectedIndex]);

	const tabs = ["Daily", "Monthly", "Yearly"];
	const dataKey = selectedIndex === 0 ? "Date" : selectedIndex === 1 ? "Month" : "Year";

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>
			<TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<TabList className="flex space-x-4 mb-6">
					{tabs.map((tab, index) => (
						<Tab
							key={index}
							className={({ selected }) =>
								`px-4 py-2 rounded transition ${
									selected ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
								}`
						}
						>
							{tab}
						</Tab>
					))}
				</TabList>
				<TabPanels>
					<TabPanel>
						<RevenueChart data={data} dataKey={dataKey} />
						<TransactionTable transactions={data} dataKey={dataKey} />
					</TabPanel>
					<TabPanel>
						<RevenueChart data={data} dataKey={dataKey} />
						<TransactionTable transactions={data} dataKey={dataKey} />
					</TabPanel>
					<TabPanel>
						<RevenueChart data={data} dataKey={dataKey} />
						<TransactionTable transactions={data} dataKey={dataKey} />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}

function RevenueChart({ data, dataKey }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={dataKey} />
				<YAxis />
				<Tooltip />
				<Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
			</LineChart>
		</ResponsiveContainer>
	);
}

function TransactionTable({ transactions, dataKey }) {
	return (
		<div className="mt-6">
			<h2 className="text-lg font-semibold mb-2">Transactions</h2>
			<table className="w-full border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-200 px-4 py-2">{dataKey}</th>
						<th className="border border-gray-200 px-4 py-2">Amount</th>
					</tr>
				</thead>
				<tbody>
					{transactions?.map((tx: any, index: any) => (
						<tr key={index} className="border border-gray-200">
							<td className="border border-gray-200 px-4 py-2">{tx.date}</td>
							<td className="border border-gray-200 px-4 py-2">${tx.revenue}</td>
							<td className="border border-gray-200 px-4 py-2">{tx.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
