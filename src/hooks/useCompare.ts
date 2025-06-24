import { useEffect, useState } from "react";
import type { Device } from "../types/common.types";
import { cpuOptions } from "../constants/common";

type useCompareOutput = {
  best_price_minor: number | null;
  best_price_major: number | null;
  best_storageOption: number | null;
  best_battery_mAh_minor: number | null;
  best_battery_mAh_major: number | null;
  best_display_Inches_minor: number | null;
  best_display_Inches_major: number | null;
  best_cpu_minor: number | null;
  best_cpu_major: number | null;
  best_features: number | null;
};

const defaultValues: useCompareOutput = {
  best_price_minor: null,
  best_price_major: null,
  best_storageOption: null,
  best_battery_mAh_minor: null,
  best_battery_mAh_major: null,
  best_display_Inches_minor: null,
  best_display_Inches_major: null,
  best_cpu_minor: null,
  best_cpu_major: null,
  best_features: null,
};

export const useCompare = (devices: Device[]): useCompareOutput => {
  const [comparision, setComparision] =
    useState<useCompareOutput>(defaultValues);

  const getCompare = (key: string, position: number) => {
    if (key === "storageOptions") {
      const idValue = devices.map((d) => ({
        id: d.id,
        value: d.storageOptions.length,
      }));
      const sortedValue = idValue.sort((a: any, b: any) => a.value - b.value);
      return sortedValue[position].id;
    }

    if (key === "features") {
      const idValue = devices.map((d) => ({
        id: d.id,
        value: d.features.length,
      }));
      const sortedValue = idValue.sort((a: any, b: any) => a.value - b.value);
      return sortedValue[position].id;
    }

    if (key === "cpu") {
      const idValue = devices.map((d) => ({
        id: d.id,
        value: cpuOptions[d.cpu],
      }));
      const sortedValue = idValue.sort((a: any, b: any) => a.value - b.value);
      return sortedValue[position].id;
    }

    const idValue = devices.map((d) => ({
      id: d.id,
      value: d[key as keyof typeof d],
    }));
    const sortedValue = idValue.sort((a: any, b: any) => a.value - b.value);

    return sortedValue[position].id;
  };

  const setObject = () => {
    const best_price_minor = getCompare("price", 0);
    const best_price_major = getCompare("price", devices.length - 1);
    const best_battery_mAh_minor = getCompare("battery_mAh", 0);
    const best_battery_mAh_major = getCompare(
      "battery_mAh",
      devices.length - 1
    );
    const best_display_Inches_minor = getCompare("display_inches", 0);
    const best_display_Inches_major = getCompare(
      "display_inches",
      devices.length - 1
    );
    const best_cpu_minor = getCompare("cpu", 0);
    const best_cpu_major = getCompare("cpu", devices.length - 1);
    const best_features = getCompare("features", devices.length - 1);
    const best_storageOption = getCompare("storageOptions", devices.length - 1);

    setComparision({
      ...comparision,
      best_price_minor,
      best_price_major,
      best_battery_mAh_minor,
      best_battery_mAh_major,
      best_display_Inches_minor,
      best_display_Inches_major,
      best_cpu_minor,
      best_cpu_major,
      best_features,
      best_storageOption,
    });
  };

  useEffect(() => {
    if (devices.length >= 2) {
      setObject();
    }
  }, [devices]);

  return comparision;
};
