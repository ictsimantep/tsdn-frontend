import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  AdminHealthResolver,
  AdminHealthValues,
} from "../../../schema/admin/health";
import { useGetHealth } from "./useGetHealth";
import { useMemo } from "react";

const defaultValues = {
  key: "",
  value: "",
  uuid: "",
};

const openAtom = atom(false);
const selectedAtom = atom("");

export const useHealthForm = () => {
  const [open, setOpen] = useAtom<boolean>(openAtom);
  const [selected, setSelected] = useAtom<string>(selectedAtom);
  const { data } = useGetHealth(selected);

  const values = useMemo(() => {
    if (!data) return defaultValues;
    return {
      key: data.key,
      value: data.value,
      uuid: data.uuid,
    };
  }, [data]);

  const form = useForm<AdminHealthValues>({
    resolver: AdminHealthResolver,
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
