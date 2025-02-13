import { NavLink } from "react-router-dom";
import {Bike, DollarSign, Wrench} from "lucide-react";

export default function Sidebar() {
	return (
		<aside className="w-64 bg-white border-r shadow-md">
			<h1 className="text-lg font-semibold p-5 border-b">Vehicle Service Management</h1>
			<nav className="p-4 space-y-2">
				<SidebarItem icon={DollarSign} label="Revenue" path="/revenue"/>
				<SidebarItem icon={Wrench} label="Parts"  path="/parts"/>
				<SidebarItem icon={Bike} label="Vehicles"  path="/vehicles"/>
			</nav>
		</aside>
	)
}

function SidebarItem({ icon: Icon, label, path }: { icon: any; label: string, path:string }) {
	return (
		<NavLink to={path}  className="flex items-center space-x-2 w-full
		text-left p-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
			<Icon className="w-5 h-5" />
			<span>{label}</span>
		</NavLink>
	);
}
