import React, { useState } from "react";
import Webcam from "react-webcam";
import "./index.css";

export const ReactWebCam = () => {
  const [openModal, setOpenModal] = useState(false);
  const [picture, setPicture] = useState("");

  const supported = 'mediaDevices' in navigator;
  console.log({supported})
  const videoConstraints = {
    width: { min: 200 },
    height: { min: 400 },
    aspectRatio: 0.6666666667,
    facingMode: "environment"
  };

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const webcam: any = webcamRef.current;
    const imageSrc = webcam.getScreenshot();
    console.log({ imageSrc });
    setPicture(imageSrc);
  }, [webcamRef]);
  return (
    <div>
      {openModal && (
        <div className="modalBackground">
          <div className="modal">
            <p>1. Consejo para una buena foto 1</p>
            <p>2. Consejo para una buena foto 2</p>
            <p>3. Consejo para una buena foto 3</p>
            <button onClick={() => setOpenModal(false)}>Entendido</button>
          </div>
        </div>
      )}
      {picture ? (
        <img src={picture} alt="ticket" />
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            videoConstraints={videoConstraints}
            width={480}
            height={720}
            onUserMedia={()=>setOpenModal(true)}
          />
          <button onClick={openModal ? undefined : capture}>
            Capture photo
          </button>
        </>
      )}
    </div>
  );
};
