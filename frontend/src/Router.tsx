import { useRoutes } from "react-router-dom";

import List from "./pages/Rides/List";
import Confirm from "./pages/Rides/Confirm";
import Estimate from "./pages/Rides/Estimate";
import Layout from "./components/Layout";

export default function Router() {
	const routes = useRoutes([
		{
			path: "/",
			element: (
				<Layout>
					<Estimate />
				</Layout>
			),
		},
		{
			path: "/confirm",
			element: (
				<Layout>
					<Confirm />
				</Layout>
			),
		},
		{
			path: "list/:customer_id",
			element: (
				<Layout>
					<List />
				</Layout>
			),
		},
	]);

	return routes;
}
