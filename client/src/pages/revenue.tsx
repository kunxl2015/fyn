import { Tab, TabPanels, TabPanel, TabList, TabGroup} from "@headlessui/react";
import { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Bar,
	AreaChart,
	Area,
} from "recharts";

const dailyData = [
	{ date: "Mon", revenue: 200 },
	{ date: "Tue", revenue: 450 },
	{ date: "Wed", revenue: 300 },
	{ date: "Thu", revenue: 500 },
	{ date: "Fri", revenue: 700 },
	{ date: "Sat", revenue: 600 },
	{ date: "Sun", revenue: 800 },
];

const monthlyData = [
	{ month: "Jan", revenue: 5000 },
	{ month: "Feb", revenue: 7500 },
	{ month: "Mar", revenue: 9000 },
	{ month: "Apr", revenue: 8000 },
	{ month: "May", revenue: 10000 },
	{ month: "Jun", revenue: 11000 },
	{ month: "Jul", revenue: 9500 },
	{ month: "Aug", revenue: 12000 },
	{ month: "Sep", revenue: 13000 },
	{ month: "Oct", revenue: 14000 },
	{ month: "Nov", revenue: 12500 },
	{ month: "Dec", revenue: 15000 },
];

const yearlyData = [
	{ year: "2020", revenue: 100000 },
	{ year: "2021", revenue: 120000 },
	{ year: "2022", revenue: 140000 },
	{ year: "2023", revenue: 160000 },
	{ year: "2024", revenue: 180000 },
];

export default function RevenuePage() {
	const [selectedIndex, setSelectedIndex] = useState(1);
	const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");

	const tabs = ["Daily", "Monthly", "Yearly"];

	const data =
		selectedIndex === 0
			? dailyData
			: selectedIndex === 1
			? monthlyData
			: yearlyData;

	const dataKey =
		selectedIndex === 0 ? "date" : selectedIndex === 1 ? "month" : "year";
	console.log(data)

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>
			<TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<TabList className="flex space-x-4 mb-6">
					{tabs.map((tab) => (
						<Tab
							key={tab}
							className={({ selected }) =>
								`px-4 py-2 rounded transition ${
									selected
										? "bg-blue-500 text-white"
										: "bg-gray-200 hover:bg-gray-300"
								}`
							}
						>
							{tab}
						</Tab>
					))}
				</TabList>
				<TabPanels>
					<TabPanel>
						<RevenueChart data={data} dataKey={dataKey} chartType={chartType} />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}

function RevenueChart({
	data,
	dataKey,
	chartType,
}: {
	data: any[];
	dataKey: string;
	chartType: "line" | "bar" | "area";
}) {
	console.log(dataKey)
	return (
		<ResponsiveContainer width="100%" height={300}>
			{chartType === "line" ? (
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={dataKey} />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
				</LineChart>
			) : chartType === "bar" ? (
				<BarChart data={monthlyData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={1} />
					<YAxis />
					<Tooltip />
					<Bar dataKey="revenue" fill="#3b82f6" />
				</BarChart>
			) : (
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={dataKey} />
					<YAxis />
					<Tooltip />
					<Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#bfdbfe" />
				</AreaChart>
			)}
		</ResponsiveContainer>
	);
}
