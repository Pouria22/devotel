import { 
  Toolbar, 
  TextField, 
  IconButton, 
  InputAdornment 
} from '@mui/material';
import { Search, ViewColumn } from '@mui/icons-material';

interface TableToolbarProps {
  onSearch: (value: string) => void;
  onToggleColumnSelector: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  onSearch,
  onToggleColumnSelector
}) => (
  <Toolbar>
    <TextField
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
    <IconButton onClick={onToggleColumnSelector}>
      <ViewColumn />
    </IconButton>
  </Toolbar>
);