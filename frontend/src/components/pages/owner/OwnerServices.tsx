import { Modal } from "@/components/elements/common/Modal";
import CreateNewServiceForm from "@/components/elements/owner/CreateNewServiceForm";
import BodyLayout from "@/components/layouts/BodyLayout";
import { useAppContext } from "@/lib/AppProvider";
import { Plus } from "lucide-react";
import { useState } from "react";

const OwnerServices = () => {
  const { user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
            <button
              className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5" /> <span>Add Service</span>
            </button>
          </div>
          <div>
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center flex-col mt-10">
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
            {/* <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {service.name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full mt-1">
                    {service.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                  {service.duration} min
                </div>
                <div className="flex items-center font-semibold text-slate-900">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  {service.price}
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Service"
          >
            <CreateNewServiceForm />
          </Modal>
        )}
      </div>
    </BodyLayout>
  );
};

export default OwnerServices;
