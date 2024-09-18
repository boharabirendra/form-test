import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormProps {
  username: string;
  email: string;
}

const initialState: FormProps = {
  username: "",
  email: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    currentFormState: (state, action: PayloadAction<FormProps>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { currentFormState } = formSlice.actions;

export const formReducer = formSlice.reducer;
