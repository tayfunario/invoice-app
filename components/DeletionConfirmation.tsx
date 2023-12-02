import { useRouter } from "next/router";
import { useSessionStorage } from "./useSessionStorage";

interface DeletionConfirmationProps {
  handleDeletion: (value: boolean) => void;
  id: string;
}

function DeletionConfirmation({
  handleDeletion,
  id,
}: DeletionConfirmationProps) {
  const { removeItem } = useSessionStorage();
  const router = useRouter();

  return (
    <div className="fixed top-0 inset-0 grid place-content-center px-7 bg-black bg-opacity-60 z-20">
      <div className="bg-white dark:bg-dark pt-10 pb-5 px-8 rounded-lg">
        <h2 className="mb-3 font-bold text-2xl dark:text-white tracking-tight">
          Confirm Deletion
        </h2>
        <p className="mb-5 text-darkerGray text-sm">
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button className="button-3" onClick={() => handleDeletion(false)}>
            Cancel
          </button>
          <button
            className="button-5"
            onClick={() => {
              removeItem();
              handleDeletion(true);
              router.push("/");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletionConfirmation;
