import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { Entry } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

export const EntriesInitialState: EntriesState = {
  entries: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, EntriesInitialState);
  const { enqueueSnackbar } = useSnackbar();
  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post("/entries", { description });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };
  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      // TODO: mostrar snackbar
      if (!showSnackbar) return;
      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries().then();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
