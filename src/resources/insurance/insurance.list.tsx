import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";
import {
	Box,
	Paper,
	Table,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	CircularProgress,
	TablePagination,
	IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { useBack } from "@refinedev/core";
import { ArrowBack } from "@mui/icons-material";
import { TableHeader } from "../../components/table-header";
import { TableToolbar } from "../../components/table-toolbar";
import { useTableOperations } from "../../hooks/use-table-operation";
import { SubmissionsResponse } from "../../types/submitted-forms.type";
import { ColumnSelector } from "../../components/column-selector";
import { useDebounce } from "../../hooks/use-debounce";
import { ErrorBoundary } from "../../components/table-error-boundry";
import { useTableState } from "../../hooks/use-table-state";

export default function InsuranceList() {
	const back = useBack();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { state: tableState, actions } = useTableState();
	const { data: submittedList, isLoading } = useList<SubmissionsResponse>({
		resource: "insurance/forms/submissions",
	});

	useEffect(() => {
		const savedColumns = localStorage.getItem("visibleColumns");
		if (savedColumns) {
			actions.setVisibleColumns(JSON.parse(savedColumns));
		} else if (submittedList?.data?.columns) {
			actions.setVisibleColumns(submittedList.data.columns);
		}
	}, [submittedList?.data?.columns]);

	const processedData = useTableOperations(
		submittedList?.data?.data,
		tableState
	);

	const handleSearchDebounced = useDebounce(actions.setSearch, 300);

	if (isLoading) return <CircularProgress />;
	if (!submittedList?.data) return null;

	const paginatedData = processedData.slice(
		tableState.page * tableState.pageSize,
		(tableState.page + 1) * tableState.pageSize
	);
	return (
    <ErrorBoundary>
      <Box sx={{ p: 3 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2} 
          sx={{ mb: 4 }}
        >
          <IconButton 
            onClick={back} 
            color="primary"
            sx={{ 
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Insurance Submissions
          </Typography>
        </Stack>

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <TableToolbar
            onSearch={handleSearchDebounced}
            onToggleColumnSelector={() =>
              setAnchorEl(document.activeElement as HTMLElement)
            }
          />
          <ColumnSelector
            anchorEl={anchorEl}
            columns={submittedList?.data?.columns || []}
            visibleColumns={tableState.visibleColumns}
            onClose={() => setAnchorEl(null)}
            onToggleColumn={actions.toggleColumn}
          />
          <TableContainer>
            <Table>
              <TableHeader
                columns={submittedList.data.columns}
                visibleColumns={tableState.visibleColumns}
                sortBy={tableState.sortBy}
                sortOrder={tableState.sortOrder}
                onSort={actions.setSort}
              />
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow 
                    key={row.id}
                    sx={{
                      '&:nth-of-type(odd)': {
                        bgcolor: 'action.hover',
                      },
                      '&:hover': {
                        bgcolor: 'action.selected',
                      },
                    }}
                  >
                    {submittedList.data.columns
                      .filter((column) =>
                        tableState.visibleColumns.includes(column)
                      )
                      .map((column) => (
                        <TableCell 
                          key={`${row.id}-${column}`}
                          sx={{ py: 2 }}
                        >
                          {row[column]}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={processedData.length}
            page={tableState.page}
            onPageChange={(_, page) => actions.setPage(page)}
            rowsPerPage={tableState.pageSize}
            onRowsPerPageChange={(e) =>
              actions.setPageSize(parseInt(e.target.value, 10))
            }
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>
    </ErrorBoundary>
  );
}
