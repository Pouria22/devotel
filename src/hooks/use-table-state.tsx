import { useReducer, useCallback } from "react";
import { TableState } from "../types/submitted-forms.type";

type TableAction =
	| { type: "TOGGLE_COLUMN"; payload: string }
	| { type: "SET_VISIBLE_COLUMNS"; payload: string[] }
	| { type: "SET_PAGE"; payload: number }
	| { type: "SET_PAGE_SIZE"; payload: number }
	| { type: "SET_SORT"; payload: { column: string; order: "asc" | "desc" } }
	| { type: "SET_SEARCH"; payload: string };

const tableReducer = (state: TableState, action: TableAction): TableState => {
	switch (action.type) {
		case "TOGGLE_COLUMN": {
			const newColumns = state.visibleColumns.includes(action.payload)
				? state.visibleColumns.filter((col) => col !== action.payload)
				: [...state.visibleColumns, action.payload];
			localStorage.setItem("visibleColumns", JSON.stringify(newColumns));
			return { ...state, visibleColumns: newColumns };
		}

		case "SET_VISIBLE_COLUMNS":
			return { ...state, visibleColumns: action.payload };

		case "SET_PAGE":
			return { ...state, page: action.payload };

		case "SET_PAGE_SIZE":
			return { ...state, pageSize: action.payload, page: 0 };

		case "SET_SORT":
			return {
				...state,
				sortBy: action.payload.column,
				sortOrder: action.payload.order,
			};

		case "SET_SEARCH":
			return { ...state, search: action.payload, page: 0 };

		default:
			return state;
	}
};

export const useTableState = () => {
	const [state, dispatch] = useReducer(tableReducer, {
		page: 0,
		pageSize: 10,
		visibleColumns: [],
		search: "",
		sortBy: undefined,
		sortOrder: undefined,
	});

	const actions = {
		toggleColumn: useCallback(
			(column: string) => dispatch({ type: "TOGGLE_COLUMN", payload: column }),
			[]
		),

		setVisibleColumns: useCallback(
			(columns: string[]) =>
				dispatch({ type: "SET_VISIBLE_COLUMNS", payload: columns }),
			[]
		),

		setPage: useCallback(
			(page: number) => dispatch({ type: "SET_PAGE", payload: page }),
			[]
		),

		setPageSize: useCallback(
			(size: number) => dispatch({ type: "SET_PAGE_SIZE", payload: size }),
			[]
		),

		setSort: useCallback(
			(column: string) =>
				dispatch({
					type: "SET_SORT",
					payload: {
						column,
						order:
							state.sortBy === column && state.sortOrder === "asc"
								? "desc"
								: "asc",
					},
				}),
			[state.sortBy, state.sortOrder]
		),

		setSearch: useCallback(
			(term: string) => dispatch({ type: "SET_SEARCH", payload: term }),
			[]
		),
	};

	return { state, actions };
};
