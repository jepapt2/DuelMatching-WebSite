import type { FC, ReactNode } from "react";

type Props = {
  closeModal: () => void;
  children: ReactNode;
  footerText: string;
};

const modalText: React.CSSProperties = {
  color: "var(--headline)",
  fontSize: "1.2rem",
};

const Modal: FC<Props> = ({ closeModal, children, footerText }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="w-auto my-6 mx-auto max-w-screen md:max-w-xl"
        >
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t">
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none mb-2">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto">{children}</div>
            {/*footer*/}
            {footerText && (
              <div className="items-center p-4 border-t border-solid border-slate-200 rounded-b">
                <center>
                  <h1 style={modalText}>{footerText}</h1>
                </center>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
