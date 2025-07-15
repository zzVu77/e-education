"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  typeOfFilter: "category" | "price";
  items: { label: string; value: string }[];
};

const Filter = ({ typeOfFilter, items }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(typeOfFilter) || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(typeOfFilter, value);
    } else {
      params.delete(typeOfFilter); // xóa nếu chọn "All"
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currentValue}>
      <SelectTrigger className="min-w-[150px] w-max focus-visible:ring-0 focus-visible:border-[1px] border-[1px] font-semibold ">
        <SelectValue placeholder={`Filter by ${typeOfFilter}`} />
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
