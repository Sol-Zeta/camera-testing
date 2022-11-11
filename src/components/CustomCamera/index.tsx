import React, { useState, useEffect, useRef } from "react";
import "./index.css";

export const CustomCamera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoWidth = window.innerWidth - 100;
  const videoHeight = window.innerHeight - 100;



  useEffect(() => {
    
  const getVideo = () => {
    

  console.log({ videoHeight, videoWidth });
  console.log({ hasPhoto });
    console.log(navigator.mediaDevices.getSupportedConstraints());
    navigator.mediaDevices
      .getUserMedia({
        video: { width: videoWidth, height: videoHeight },
      })
      .then((stream) => {
        let video: any = videoRef.current;
        video.srcObject = stream;
        video.play();
        setIsVideoReady(true);
      })
      .catch((e) => console.error(e));
  };

    setIsVideoReady(false);
    getVideo();
    /* @ts-ignore */
  }, [videoRef, videoWidth, videoHeight, hasPhoto]);

  const takePhoto = () => {
    // const width = 300;
    // const height = width / (16 / 9);
    let video: any = videoRef.current;
    const photoHeight = video.offsetHeight
      ? video.offsetWidth * 0.5
      : videoHeight * 0.5;
    const photoWidth = photoHeight / (16 / 9);
    console.log({ video });
    let photo: any = photoRef.current;

    photo.width = photoWidth;
    photo.height = photoHeight;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photoWidth, photoHeight);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo: any = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  return (
    <div className="container">
      {isVideoReady && (
        <div className="modalBackground" onClick={() => setIsVideoReady(false)}>
          <div className="modal">
            <p>1. Consejo para una buena foto 1</p>
            <p>2. Consejo para una buena foto 2</p>
            <p>3. Consejo para una buena foto 3</p>
          </div>
        </div>
      )}
      <div className={`result${hasPhoto ? " hasPhoto" : ""}`}>
        <canvas ref={photoRef}></canvas>
        <button
          className={`button-result${hasPhoto ? " hasPhoto" : ""}`}
          onClick={closePhoto}
        >
          close
        </button>
      </div>
      <div className={`camera${hasPhoto ? " hasPhoto" : ""}`}>
        <video ref={videoRef}></video>
        <button className="button" onClick={takePhoto}></button>
      </div>
    </div>
  );
};
