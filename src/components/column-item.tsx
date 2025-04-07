import { MenuItem, Checkbox, ListItemText } from '@mui/material';

interface ColumnItemProps {
  column: string;
  isVisible: boolean;
  onToggle: (column: string) => void;
  disabled?: boolean;
}

export const ColumnItem: React.FC<ColumnItemProps> = ({
  column,
  isVisible,
  onToggle,
  disabled = false
}) => (
  <MenuItem
    onClick={() => onToggle(column)}
    disabled={disabled}
    dense
    sx={{ minWidth: 200 }}
  >
    <Checkbox
      checked={isVisible}
      indeterminate={false}
      size="small"
      inputProps={{
        'aria-label': `Toggle ${column} column visibility`
      }}
    />
    <ListItemText 
      primary={column}
      primaryTypographyProps={{
        variant: 'body2'
      }}
    />
  </MenuItem>
);