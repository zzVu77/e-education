"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category2 } from "iconsax-reactjs";
import { DollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  typeOfFilter: "category" | "price";
  items: { label: string; value: string }[];
};

const Filter = ({ typeOfFilter, items }: Props) => {
  const router = useRouter();
  const filterParams = useSearchParams();
  const currentValue = filterParams.get(typeOfFilter) || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(filterParams.toString());
    if (value) {
      params.set(typeOfFilter, value);
    } else {
      params.delete(typeOfFilter);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currentValue}>
      <SelectTrigger className="min-w-[100px] md:mim-w-[150px] w-max focus-visible:ring-0 focus-visible:border-[1px] border-[1px] font-semibold shadow-sm h-10 rounded-lg cursor-pointer ">
        {/* <Funnel className=" h-4 w-4 text-black pointer-events-none" /> */}
        {typeOfFilter === "category" ? (
          <Category2 size="32" variant="Outline" />
        ) : (
          <DollarSign className=" h-4 w-4 text-gray-500 pointer-events-none" />
        )}

        <SelectValue
          placeholder={
            typeOfFilter.charAt(0).toUpperCase() + typeOfFilter.slice(1)
          }
        />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
