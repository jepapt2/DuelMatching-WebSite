import React, { useCallback, useEffect, useState, FC } from "react";
import Modal from "./Modal";

type Props = {
  footerText: string;
  image: string;
};

const modalCardButtonStyle: React.CSSProperties = {
  padding: "0 0 0.5rem 0",
  backgroundColor: "var(--secondary-background)",
  borderRadius: "0.5rem",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  marginBottom: "1.5rem",
};

const modalImage: React.CSSProperties = {
  height: "70vh",
};

const cardText: React.CSSProperties = {
  color: "var(--headline)",
  fontSize: "0.8rem",
};

const ModalCard: FC<Props> = ({ footerText, image }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => {
    setShowModal(false);
    document.removeEventListener("click", closeModal);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [closeModal]);

  function openModal(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setShowModal(true);
    document.addEventListener("click", closeModal);
    event.stopPropagation();
  }

  return (
    <>
      <button type="button" onClick={(e) => openModal(e)}>
        <div style={modalCardButtonStyle}>
          <img src={image} className="rounded-lg mb-2" />
          <center>
            <h3 style={cardText}>{footerText}</h3>
          </center>
        </div>
      </button>
      {showModal ? (
        <Modal closeModal={closeModal} footerText={footerText}>
          <img src={image} style={modalImage} />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalCard;
