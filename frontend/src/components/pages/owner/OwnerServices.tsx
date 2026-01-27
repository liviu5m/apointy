import { getBusiness } from "@/api/business";
import {
  deleteService,
  getAllServices,
  getAllServicesByUserId,
} from "@/api/service";
import { getAllServiceCategories } from "@/api/serviceCategory";
import BusinessDataForm from "@/components/elements/common/BusinessDataForm";
import Loader from "@/components/elements/common/Loader";
import { Modal } from "@/components/elements/common/Modal";
import BusinessHolidayModal from "@/components/elements/owner/BusinessHolidayModal";
import CreateNewServiceForm from "@/components/elements/owner/CreateNewServiceForm";
import UpdateServiceForm from "@/components/elements/owner/UpdateServiceForm";
import BodyLayout from "@/components/layouts/BodyLayout";
import { useAppContext } from "@/lib/AppProvider";
import type { Service } from "@/lib/Types";
import { convertEnumServiceDuration } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BriefcaseBusiness,
  Clock,
  DollarSign,
  Edit2,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const OwnerServices = () => {
  const queryClient = useQueryClient();
  const { user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(-1);
  const [editService, setEditService] = useState<Service | null>(null);

  const { data: services, isPending } = useQuery({
    queryKey: ["owner-services"],
    queryFn: () => getAllServicesByUserId(),
  });

  const { data: business, isPending: isBusinessPending } = useQuery({
    queryKey: ["get-business-data"],
    queryFn: () => getBusiness(),
  });

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this service?",
      text: "This will result in permanent removal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeService(id);
      }
    });
  };

  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ["service-categories"],
    queryFn: () => getAllServiceCategories(),
  });

  const { mutate: removeService } = useMutation({
    mutationKey: ["delete-service"],
    mutationFn: (id: number) => deleteService(id),
    onSuccess: (data) => {
      console.log(data);
      toast("Service removed successfully");
      queryClient.invalidateQueries({ queryKey: ["owner-services"] });
    },
    onError: (err) => {
      console.log(err);
      toast("Something went wrong.");
    },
  });

  return isPending || isCategoriesLoading || isBusinessPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-center">
        <div className="container py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-4xl">Services</h1>
              <h5 className="mt-2 text-gray-600">
                Manage the services you offer to customers.
              </h5>
            </div>
            <div className="flex items-center gap-5">
              <button
                className="px-5 py-3 rounded-lg flex items-center justify-center gap-3 font-semibold cursor-pointer bg-white"
                onClick={() => setIsBusinessModalOpen(true)}
              >
                <Settings className="w-5" /> <span>Update Business Data</span>
              </button>
              <button
                className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5" /> <span>Add Service</span>
              </button>
            </div>
          </div>
          <div className="mt-10">
            {services.length == 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center flex-col">
                <p className="text-slate-500 mb-4">
                  You haven't added any services yet.
                </p>
                <button
                  className="px-5 py-3 rounded-lg text-gray-600 flex items-center justify-center bg-white font-semibold cursor-pointer hover:bg-gray-50 border border-gray-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create your first service
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service: Service, i: number) => {
                  return (
                    <div
                      className="bg-white rounded-lg shadow border border-gray-200"
                      key={i}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0">
                              {service.businessDto?.imageUrl ? (
                                <img
                                  src={
                                    service.businessDto.imageUrl ||
                                    "/api/placeholder/64/64"
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
                              <h3 className="font-bold text-lg text-slate-900 leading-tight">
                                {service.name}
                              </h3>

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
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors cursor-pointer"
                              onClick={() => setEditService(service)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                            {service.description}
                          </p>
                          <button
                            className="text-sm px-4 py-2 rounded-lg shadow bg-gray-200 mb-5 cursor-pointer hover:bg-gray-100"
                            onClick={() => setIsHolidayModalOpen(service.id)}
                          >
                            Business Holiday
                          </button>
                        </div>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center text-slate-600 text-sm">
                            <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                            {convertEnumServiceDuration(service.duration)}
                          </div>
                          <div className="flex items-center font-semibold text-slate-900">
                            <DollarSign className="h-4 w-4 text-slate-400" />
                            {service.price}
                          </div>
                        </div>
                      </div>

                      {!service.available && (
                        <div className="bg-slate-100 px-6 py-2 text-xs font-medium text-slate-500 text-center rounded-b-lg">
                          Currently Unavailable
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Service"
          >
            <CreateNewServiceForm
              setIsModalOpen={setIsModalOpen}
              categories={categories}
            />
          </Modal>
        )}
        {editService && (
          <Modal
            isOpen={editService ? true : false}
            onClose={() => setEditService(null)}
            title="Update Service"
          >
            <UpdateServiceForm
              setEditService={setEditService}
              editService={editService}
              categories={categories}
            />
          </Modal>
        )}
        {isBusinessModalOpen && (
          <Modal
            isOpen={isBusinessModalOpen}
            onClose={() => setIsBusinessModalOpen(false)}
            title="Update Business Data"
          >
            <BusinessDataForm
              business={business}
              setIsBusinessModalOpen={setIsBusinessModalOpen}
            />
          </Modal>
        )}
        {isHolidayModalOpen != -1 && (
          <Modal
            isOpen={isHolidayModalOpen != -1}
            onClose={() => setIsHolidayModalOpen(-1)}
            title="Business Holidays"
          >
            <BusinessHolidayModal
              serviceId={isHolidayModalOpen}
              setIsHolidayModalOpen={setIsHolidayModalOpen}
            />
          </Modal>
        )}
      </div>
    </BodyLayout>
  );
};

export default OwnerServices;
