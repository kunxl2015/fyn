import { TransactionProps } from "../utils/interface";

export default function TransactionTable({ transactions, dataKey }: TransactionProps) {
	console.log(transactions)
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
							<td className="border border-gray-200 px-4 py-2">{tx[dataKey]}</td>
							<td className="border border-gray-200 px-4 py-2">${tx.revenue}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
