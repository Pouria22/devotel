import { Refine } from "@refinedev/core";
import RouterProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import InsuranceCreate from "./resources/insurance/insurance.create";
import { dataProvider } from "./services/data-provider";
import InsuranceList from "./resources/insurance/insurance.list";


const routes = [
  <Route path="/" element={<InsuranceCreate />} />,
  <Route path="/list" element={<InsuranceList />} />
];
export default function App() {
	return (
		<BrowserRouter>
			<Refine
				routerProvider={RouterProvider}
				dataProvider={dataProvider("https://assignment.devotel.io/api")}
				resources={[
					{
						name: "insurance/forms",
						list: "/forms",
					},
					{
						name: "insurance/forms/submissions",
						list: "/list",
					},
				]}
			>
				<Routes>
					{routes}
				</Routes>
			</Refine>
		</BrowserRouter>
	);
}
