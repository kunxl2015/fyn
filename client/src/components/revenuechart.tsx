import { RevenueChartProps } from "../utils/interface";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data, dataKey }: RevenueChartProps) {
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
