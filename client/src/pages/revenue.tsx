import { Tab, TabPanels, TabPanel, TabList, TabGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { fetchRevenue } from "../utils/api";
import { RevenueChart, TransactionTable } from "../components";


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
