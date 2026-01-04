import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CreateNewServiceForm = () => {
  const [data, setData] = useState({
    name: "",
    duration: "",
    price: "",
    category: "General",
    description: "",
    available: false,
  });

  console.log(data);

  return (
    <form className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-2">Service Name</h4>
        <input
          type="email"
          placeholder="e.g. Haircut"
          className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Duration</h4>
          <Select
            value={data.duration}
            onValueChange={(e) => setData({ ...data, duration: e })}
          >
            <SelectTrigger className="w-full py-5 text-sm">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MIN_15">15 min</SelectItem>
              <SelectItem value="MIN_30">30 min</SelectItem>
              <SelectItem value="MIN_45">45 min</SelectItem>
              <SelectItem value="HOUR_1">1 hour</SelectItem>
              <SelectItem value="HOUR_1_5">1.5 hours</SelectItem>
              <SelectItem value="HOUR_2">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Price ($)</h4>
          <input
            type="number"
            step={0.01}
            className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2">Category</h4>
        <input
          type="text"
          className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-semibold mb-2">Description</h4>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe what's included..."
          required
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isActive"
          className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
          checked={data.available}
          onChange={(e) => setData({ ...data, available: e.target.checked })}
        />
        <label
          htmlFor="isActive"
          className="text-sm font-medium text-slate-700"
        >
          Available for booking
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]">
          Cancel
        </button>
        <button className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CreateNewServiceForm;
