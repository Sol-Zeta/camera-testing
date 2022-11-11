import { useState } from "react";

/* @ts-ignore */
// import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import "./App.css";
import { CustomCamera } from "./components/CustomCamera";
import { ReactWebCam } from "./components/ReactWebcam";

function App() {
  const [cameraType, setCameraType] = useState("");
  const [picture, setPicture] = useState<any>()
  const [pictureToSend, setPictureToSend] = useState<any>()
  

  // Avoid Buffer is not defined error from AWS S3
  // https://github.com/Fausto95/aws-s3/issues/88
  window.Buffer = window.Buffer || require("buffer").Buffer;

  /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET,
    region: process.env.REACT_APP_REGION,
  }
 
 
 
// we need to send AWS the fileObject

  const getPicture = (e:any) => {
    console.log(e.target.files)
    const file = e.target.files[0]
    const link = window.URL.createObjectURL(file)
    console.log(link)
    setPicture(link)
    setPictureToSend(file)
  }
  const sendPicture = () => {
    console.log(pictureToSend, config)
    uploadFile(pictureToSend, config)
    .then((data: any) => {
      alert(data)
      console.log(data)
    })
    .catch((err: any) => {
      alert(process.env.REACT_APP_AWS_BUCKET)
      console.log('ERROR', err, err.message)
    })
  }

  return (
    <div className="App">
      <button className="button-reset" onClick={() => setCameraType("")}>
        RESET
      </button>
      <section>
        {cameraType === "native" ? (
          <>
            <label htmlFor="imageFile" className="custom-file-upload">
              <p>Press me!</p>
            </label>
            <input type="file" id="imageFile" accept="image/*" onChange={getPicture}/>
            <img src={picture} alt="" width={100} style={{marginTop: 30}}/>
            <button onClick={sendPicture}>send</button>
          </>
        ) : cameraType === "custom" ? (
          <CustomCamera />
        ) : cameraType === "react" ? (
          <ReactWebCam />
        ) : (
          <section className="buttons-container">
            <button onClick={() => setCameraType("native")}>
              Native Camera
            </button>
            <button onClick={() => setCameraType("custom")}>
              Custom Camera
            </button>
            <button onClick={() => setCameraType("react")}>React webcam</button>
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
