import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface TableHeaderProps {
  columns: string[];
  visibleColumns: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort: (column: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  visibleColumns,
  sortBy,
  sortOrder,
  onSort
}) => (
  <TableHead>
    <TableRow>
      {columns
        .filter(column => visibleColumns.includes(column))
        .map(column => (
          <TableCell key={column}>
            <TableSortLabel
              active={sortBy === column}
              direction={sortBy === column ? sortOrder : 'asc'}
              onClick={() => onSort(column)}
            >
              {column}
            </TableSortLabel>
          </TableCell>
        ))}
    </TableRow>
  </TableHead>
);