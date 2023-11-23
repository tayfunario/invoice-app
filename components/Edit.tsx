import { motion } from "framer-motion";
import Header from "./Header";

interface EditProps {
  edit: boolean;
}

const variant = {
  open: { clipPath: "circle(150% at 100% 100%)" },
  closed: { clipPath: "circle(0% at 100% 0%)" },
};

function Edit({ edit }: EditProps) {
  return (
    <motion.div
      className="fixed w-full h-screen top-0 bg-white"
      variants={variant}
      animate={edit ? "open" : "closed"}
    >
      <Header />

      <div className="absolute bottom-0 flex justify-end items-center gap-x-2 w-full h-20 px-5 custom-shadow">
        <button className="text-sm font-semibold rounded-3xl bg-lightBG text-fadedPurple py-[14px] px-4 tracking-tight">Cancel</button>
        <button className="text-sm font-semibold rounded-3xl bg-customPurple text-white py-[14px] px-4 tracking-tight">Save Changes</button>
      </div>
    </motion.div>
  );
}

export default Edit;
