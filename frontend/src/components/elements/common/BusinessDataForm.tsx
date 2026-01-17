import { updateBusinessFunc } from "@/api/business";
import type { Business } from "@/lib/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import { uploadImage } from "@/api/cloudinary";

const BusinessDataForm = ({
  business,
  setIsBusinessModalOpen,
}: {
  business: Business;
  setIsBusinessModalOpen: (e: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<Business>({
    ...business,
  });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState("");

  const { mutate: updateBusiness } = useMutation({
    mutationKey: ["update-business"],
    mutationFn: (imageUrl: string) => updateBusinessFunc(data, imageUrl),
    onSuccess: (data) => {
      console.log(data);
      toast("Updated successfully");
      setIsBusinessModalOpen(false);
      queryClient.invalidateQueries({queryKey: ["owner-services"]})
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: uploadCloudinary } = useMutation({
    mutationKey: ["upload-cloudinary"],
    mutationFn: () => uploadImage(selectedFile),
    onSuccess: (data) => {
      console.log(data);
      updateBusiness(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast("Please select an image file");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <form
        className="space-y-4"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedFile) uploadCloudinary();
          else updateBusiness("");
        }}
      >
        <div>
          <h4 className="text-sm font-semibold mb-2">Business Name</h4>
          <input
            type="text"
            placeholder="Name"
            className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Address</h4>
          <input
            type="text"
            placeholder="Address"
            className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">City</h4>
          <input
            type="text"
            placeholder="City"
            className="px-5 py-3 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold mb-2">Description</h4>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe what's included..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div className="items-center justify-center flex">
          <label
            htmlFor="profileImage"
            className="px-5 items-center justify-center cursor-pointer"
          >
            <div className="aspect-square w-[200px] rounded-full flex items-center justify-center bg-gray-300 mb-5">
              {data?.imageUrl || previewUrl ? (
                <img
                  src={previewUrl ? previewUrl : data.imageUrl}
                  className="rounded-full w-full h-full aspect-square object-cover"
                />
              ) : (
                <User />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="profileImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-5 py-3 rounded-lg flex items-center justify-center bg-white border border-gray-200 gap-3 font-semibold cursor-pointer hover:bg-gray-50"
            onClick={() => setIsBusinessModalOpen(false)}
          >
            Cancel
          </button>
          <button className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default BusinessDataForm;
