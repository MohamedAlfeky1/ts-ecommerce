import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface Iprops {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  title?: string;
}
function Modal({ isOpen, close, children, title }: Iprops) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="
        relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-xs ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 inset-shadow-2xs duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                {title}
              </DialogTitle>

              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default Modal;
