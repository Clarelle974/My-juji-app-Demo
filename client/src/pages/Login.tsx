import { useState } from "react";
import "./login.css";
import "../App.css";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import LoginPopUp from "../components/LoginPopUp";

export default function Login() {
  /*******LOGIN POP UP PROPS */
  const belts = useLoaderData() as BeltData[];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  /********************************* */

  return (
    <main id="main" className="login">
      <motion.img
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: [3, 0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
        src="/1.png"
        alt="jujitsu en japonais"
      />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut", delay: 1 }}
      >
        Une aide pour préparer le passage de grade en jujitsu traditionnel
      </motion.h2>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 2 }}
        type="button"
        className="dark-square"
        onClick={openModal}
      >
        Hajime !
      </motion.button>
      <LoginPopUp isOpen={isModalOpen} onClose={closeModal} belts={belts} />
    </main>
  );
}
