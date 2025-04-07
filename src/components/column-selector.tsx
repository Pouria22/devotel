import { Menu, Typography, Box } from '@mui/material';
import { ColumnItem } from './column-item';
import { useCallback, useMemo } from 'react';

interface ColumnSelectorProps {
  anchorEl: HTMLElement | null;
  columns: string[];
  visibleColumns: string[];
  onClose: () => void;
  onToggleColumn: (column: string) => void;
  minSelectCount?: number;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  anchorEl,
  columns,
  visibleColumns,
  onClose,
  onToggleColumn,
  minSelectCount = 1
}) => {
  const isColumnDisabled = useCallback((column: string) => {
    return visibleColumns.length <= minSelectCount && visibleColumns.includes(column);
  }, [visibleColumns, minSelectCount]);

  const sortedColumns = useMemo(() => 
    [...columns].sort((a, b) => a.localeCompare(b)),
    [columns]
  );

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: { maxHeight: 300 }
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Visible Columns
        </Typography>
      </Box>
      {sortedColumns.map((column) => (
        <ColumnItem
          key={column}
          column={column}
          isVisible={visibleColumns.includes(column)}
          onToggle={onToggleColumn}
          disabled={isColumnDisabled(column)}
        />
      ))}
    </Menu>
  );
};