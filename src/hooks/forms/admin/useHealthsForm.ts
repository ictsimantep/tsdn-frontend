import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  AdminHealthsResolver,
  AdminHealthsValues,
} from "../../../schema/admin/healths";
import { useGetHealths } from "./useGetHealths";
import { useMemo } from "react";

const defaultValues = {
  key: "",
  value: "",
  uuid: "",
};

const openAtom = atom(false);
const selectedAtom = atom("");

export const useHealthsForm = () => {
  const [open, setOpen] = useAtom<boolean>(openAtom);
  const [selected, setSelected] = useAtom<string>(selectedAtom);
  const { data } = useGetHealths(selected);

  const values = useMemo(() => {
    if (!data) return defaultValues;
    return {
      key: data.key,
      value: data.value,
      uuid: data.uuid,
    };
  }, [data]);

  const form = useForm<AdminHealthsValues>({
    resolver: AdminHealthsResolver,
    defaultValues,
    values,
  });

  return {
    open,
    setOpen,
    form,
    selected,
    setSelected,
    data
  };
};
