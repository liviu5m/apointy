import { Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "../common/Modal";
import CreateBusinessHolidayForm from "./CreateBusinessHolidayForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBusinessHoliday, getBusinessHolidays } from "@/api/holiday";
import type { Holiday } from "@/lib/Types";
import HolidayCard from "../auth/HolidayCard";
import Loader from "../common/Loader";
import UpdateBusinessHolidayForm from "./UpdateBusinessHolidayForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BusinessHolidayModal = ({
  serviceId,
  setIsHolidayModalOpen,
}: {
  serviceId: number;
  setIsHolidayModalOpen: (e: number) => void;
}) => {
  const [createHolidayModal, setCreateHolidayModal] = useState(false);
  const [updateHoliday, setUpdateHoliday] = useState<Holiday | null>(null);
  const queryClient = useQueryClient();

  const { data: holidays, isLoading } = useQuery({
    queryKey: ["business-holidays", serviceId],
    queryFn: () => getBusinessHolidays(serviceId),
  });

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure you want to proceed this ?",
      text: "This action can not be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHoliday(id);
      }
    });
  };

  const { mutate: deleteHoliday } = useMutation({
    mutationKey: ["delete-holiday"],
    mutationFn: (id: number) => deleteBusinessHoliday(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["business-holidays", serviceId],
      });
      toast("Successfully removed holiday");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex items-center justify-between">
        <h1>Holidays ({holidays.length}): </h1>
        <button
          className="flex items-center justify-center px-4 py-2 rounded-lg shadow bg-[#0891B2] text-white gap-3 text-sm cursor-pointer"
          onClick={() => setCreateHolidayModal(true)}
        >
          <Plus className="w-5" /> <span>Add More</span>
        </button>
      </div>
      {holidays.length == 0 && (
        <p className="text-sm text-gray-600 mt-10 text-center">No Holidays</p>
      )}
      <div className="max-h-[70vh] overflow-scroll my-10 no-scrollbar flex flex-col gap-5">
        {holidays.map((holiday: Holiday, i: number) => {
          return (
            <HolidayCard
              onDelete={(id: number) => handleDelete(id)}
              holiday={holiday}
              key={i}
              setUpdateHoliday={setUpdateHoliday}
            />
          );
        })}
      </div>
      {createHolidayModal && (
        <Modal
          isOpen={createHolidayModal}
          onClose={() => setCreateHolidayModal(false)}
          title="Create Business Holiday"
        >
          <CreateBusinessHolidayForm
            serviceId={serviceId}
            onClose={() => setCreateHolidayModal(false)}
          />
        </Modal>
      )}
      {updateHoliday && (
        <Modal
          isOpen={updateHoliday ? true : false}
          onClose={() => setUpdateHoliday(null)}
          title="Update Business Holiday"
        >
          <UpdateBusinessHolidayForm
            serviceId={serviceId}
            holiday={updateHoliday}
            onClose={() => setUpdateHoliday(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default BusinessHolidayModal;
