import { getAllServices, getPriceRange } from "@/api/service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Clock, Search, X } from "lucide-react";
import { getAllServiceCategories } from "@/api/serviceCategory";
import type { AppointmentData, Service, ServiceCategory } from "@/lib/Types";
import Loader from "@/components/elements/common/Loader";
import Slider from "rc-slider";
import { convertEnumServiceDuration } from "@/lib/utils";
import Pagination from "@/components/elements/common/Pagination";

const AppointmentServices = ({
  setStep,
  setData,
  data,
}: {
  setStep: (e: number) => void;
  setData: (e: AppointmentData) => void;
  data: AppointmentData;
}) => {
  const [filterData, setFilterData] = useState({
    name: "",
    duration: "",
    categoryId: "",
    prices: [0, 0],
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: services, isPending } = useQuery({
    queryKey: ["owner-services", filterData, page],
    queryFn: () => getAllServices(filterData, page, pageSize),
    placeholderData: keepPreviousData,
  });

  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ["service-categories"],
    queryFn: () => getAllServiceCategories(),
  });

  const { data: priceRange, isPending: isPriceRangeLoading } = useQuery({
    queryKey: ["service-prices"],
    queryFn: () => getPriceRange(),
  });

  console.log(services);

  useEffect(() => {
    if (priceRange)
      setFilterData({
        ...filterData,
        prices: [priceRange[0][0], priceRange[0][1]],
      });
  }, [priceRange]);

  return isCategoriesLoading || isPriceRangeLoading || isPending ? (
    <Loader />
  ) : (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={filterData.name}
              onChange={(e) =>
                setFilterData({ ...filterData, name: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>
          <div className="w-full max-w-xs py-2 px-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-center mb-1 absolute -top-8 w-full">
              <label className="text-sm font-semibold text-gray-700">
                Price Range
              </label>
              <div className="flex space-x-1 text-sm font-bold text-blue-600">
                <span>${filterData.prices[0]}</span>
                <span className="text-gray-400">-</span>
                <span>${filterData.prices[1]}</span>
              </div>
            </div>
            <Slider
              range
              min={priceRange[0][0]}
              max={priceRange[0][1]}
              value={filterData.prices}
              onChange={(val) =>
                setFilterData({ ...filterData, prices: val as number[] })
              }
              trackStyle={{
                backgroundColor: "#3b82f6",
                height: 6,
              }}
              handleStyle={[
                {
                  borderColor: "#3b82f6",
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  opacity: 1,
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                },
                {
                  borderColor: "#3b82f6",
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  opacity: 1,
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                },
              ]}
              railStyle={{
                backgroundColor: "#f3f4f6",
                height: 6,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={filterData.categoryId}
            onValueChange={(e) =>
              setFilterData({ ...filterData, categoryId: e })
            }
          >
            <SelectTrigger className="w-full py-5 text-sm">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value={"all"}>All categories</SelectItem>
              {categories.map((category: ServiceCategory, i: number) => {
                return (
                  <SelectItem value={String(category.id)} key={i}>
                    {category.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            value={filterData.duration}
            onValueChange={(e) => setFilterData({ ...filterData, duration: e })}
          >
            <SelectTrigger className="w-full py-5 text-sm">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All durations</SelectItem>
              <SelectItem value="MIN_15">15 min</SelectItem>
              <SelectItem value="MIN_30">30 min</SelectItem>
              <SelectItem value="MIN_45">45 min</SelectItem>
              <SelectItem value="HOUR_1">1 hour</SelectItem>
              <SelectItem value="HOUR_1_5">1.5 hours</SelectItem>
              <SelectItem value="HOUR_2">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-slate-600">
            {services.content.length}{" "}
            {services.content.length === 1 ? "service" : "services"} available
          </p>
          {filterData && (
            <button
              onClick={() =>
                setFilterData({
                  name: "",
                  duration: "",
                  categoryId: "",
                  prices: [priceRange[0][0], priceRange[0][1]],
                })
              }
              className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-4">
        {services.content.map((service: Service) => (
          <button
            key={service.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left group cursor-pointer"
            onClick={() => {
              setData({ ...data, service: service });
              setStep(2);
            }}
          >
            <div className="flex gap-5">
              <div className="h-16 w-16 flex-shrink-0">
                {service.businessDto?.imageUrl ? (
                  <img
                    src={
                      service.businessDto.imageUrl || "/api/placeholder/64/64"
                    }
                    className="h-full w-full object-cover rounded-lg border border-gray-100"
                  />
                ) : (
                  <div className="h-full w-full object-cover rounded-lg border border-gray-100 flex items-center justify-center bg-gray-200">
                    <BriefcaseBusiness />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-cyan-700 flex gap-3 items-center">
                  <span>{service.name}</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                      {service.category.name}
                    </span>

                    <span className="inline-flex items-center text-cyan-600 text-xs font-semibold">
                      <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
                      {service.businessDto.name
                        ? service.businessDto.name
                        : "Business #" + service.businessDto.id}
                    </span>
                  </div>
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {service.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />{" "}
                    {convertEnumServiceDuration(service.duration)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-cyan-700">
              ${service.price}
            </div>
          </button>
        ))}
      </div>
      <Pagination
        items={services.totalElements}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AppointmentServices;
