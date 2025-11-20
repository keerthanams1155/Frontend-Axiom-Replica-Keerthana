import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";

interface TokenTableState {
  sortColumn: keyof Token | null;
  sortDirection: "asc" | "desc";
  selectedToken: Token | null;
  filters: {
    category: "all" | "new" | "final-stretch" | "migrated";
  };
}

const initialState: TokenTableState = {
  sortColumn: null,
  sortDirection: "asc",
  selectedToken: null,
  filters: {
    category: "all",
  },
};

const tokenTableSlice = createSlice({
  name: "tokenTable",
  initialState,
  reducers: {
    setSort: (
      state,
      action: PayloadAction<{ column: keyof Token; direction: "asc" | "desc" }>
    ) => {
      state.sortColumn = action.payload.column;
      state.sortDirection = action.payload.direction;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    setCategoryFilter: (
      state,
      action: PayloadAction<"all" | "new" | "final-stretch" | "migrated">
    ) => {
      state.filters.category = action.payload;
    },
  },
});

export const { setSort, setSelectedToken, setCategoryFilter } =
  tokenTableSlice.actions;
export default tokenTableSlice.reducer;

