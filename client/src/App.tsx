import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./components/sidebar";
import { RevenuePage, PartsPage, VehiclesPage } from "./pages";

export default function App() {
	return (
		<Router>
			<div className="flex h-screen bg-gray-50">
				<Sidebar />
				<Routes>
					<Route path="/revenue" element={<RevenuePage />} />
					<Route path="/parts" element={<PartsPage />} />
					<Route path="/vehicles" element={<VehiclesPage />} />
				</Routes>
			</div>
		</Router>
	);
}
