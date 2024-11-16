import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  AdminHealthResolver,
  AdminHealthValues,
} from "../../../schema/admin/health";
import { useGetHealth } from "./useGetHealth";
import { useMemo } from "react";

const defaultValues = {
  nama: "",
  jenis_kelamin: "",
  umur: "",
  bb: "",
  tb: "",
  systol: "",
  diastol: "", 
  heart_rate: "",
  profesi: "",
  risk: "",
  bmi: "",
  recommendation_food: "",
  recommendation_sport: "",
  recommendation_medicine: "",
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
      nama: data.nama,
      jenis_kelamin: data.jenis_kelamin,
      umur: data.umur,
      bb: data.bb,
      tb: data.tb,
      systol: data.systol,
      diastol: data.diastol,
      heart_rate: data.heart_rate,
      profesi: data.profesi,
      risk: "",
      bmi: "",
      recommendation_food: "",
      recommendation_sport: "",
      recommendation_medicine: "",
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
