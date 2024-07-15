"use client";
import "react";
import ErrorPage from "next/error";
import { PAGES, MODALS, type ModalType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useWindowHeight } from "@react-hook/window-size";

export default function Page({ params }: { params: { path: string } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currModal, setCurrModal] = useState<ModalType | null>(null);
  const height = useWindowHeight();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!params || !params.path || !PAGES[params.path]) {
    return <ErrorPage statusCode={404} />;
  }

  const openModal = (modalIndex: number) => {
    setCurrModal(MODALS[modalIndex]);
    setIsOpen(true);
  };

  return (
    <div
      className={cn(
        `w-full h-[200vh] text-white relative flex flex-col pt-32 items-center`,
        PAGES[params.path].backgroundColor
      )}
    >
      <div className="flex flex-col gap-y-2">
        <h1 className="uppercase">{params.path}</h1>
        <div className="flex gap-4">
          {PAGES[params.path].modal.map((modalIdx) => (
            <button
              key={modalIdx}
              onClick={() => openModal(modalIdx)}
              className="cursor-pointer px-4 py-2 bg-white text-black rounded-lg hover:bg-slate-300"
            >
              Modal {modalIdx}
            </button>
          ))}
        </div>
      </div>
      {isOpen && currModal && <Modal isOpen={isOpen} closeModal={closeModal} modalContent={currModal} />}
    </div>
  );
}
