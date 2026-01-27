import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Modal } from "../common/Modal";
import CreateBusinessHolidayForm from "./CreateBusinessHolidayForm";

const BusinessHolidayModal = ({
  serviceId,
  setIsHolidayModalOpen,
}: {
  serviceId: number;
  setIsHolidayModalOpen: (e: number) => void;
}) => {
  const [createHolidayModal, setCreateHolidayModal] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Holidays (10): </h1>
        <button
          className="flex items-center justify-center px-4 py-2 rounded-lg shadow bg-[#0891B2] text-white gap-3 text-sm cursor-pointer"
          onClick={() => setCreateHolidayModal(true)}
        >
          <Plus className="w-5" /> <span>Add More</span>
        </button>
      </div>
      <div>Business List</div>
      {createHolidayModal && (
        <Modal
          isOpen={createHolidayModal}
          onClose={() => setCreateHolidayModal(false)}
          title="Create Business Holiday"
        >
          <CreateBusinessHolidayForm serviceId={serviceId} />
        </Modal>
      )}
    </div>
  );
};

export default BusinessHolidayModal;
