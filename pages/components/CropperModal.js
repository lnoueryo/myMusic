import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog, Slide, Button } from "@mui/material";
import { useRef, useState } from "react";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CropperModal({setSrc}) {

  const [open, setOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState()
  const cropperRef = useRef(null);
  const inputRef = useRef(null)
  const loadImage = async(e) => {
    const file = e.target.files[0];
    const reader =  new FileReader()
    reader.readAsDataURL(file)
    const image = await new Promise((resolve, reject) => {
      reader.onload = () => {
        setCropSrc(reader.result)
        resolve(reader);
      }
      reader.onerror = reject
    })
    setOpen(true)
  }
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setSrc(cropper.getCroppedCanvas().toDataURL())
    setOpen(false)
    setCropSrc('')
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <label htmlFor="cropImage" className="none">
      cropImage
        <input id="cropImage" ref={inputRef} type="file" onChange={(e) => loadImage(e)} />
      </label>
      <Button className="box-bottom" size='sm' onClick={() => inputRef.current.click()}>ファイルを選択</Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
          <Cropper
            src={cropSrc}
            style={{ height: 400, width: "100%" }}
            aspectRatio ={1/1}
            guides={false}
            ref={cropperRef}
          />
          <Button onClick={() => onCrop()}>切り取り</Button>
      </Dialog>
    </div>
  );
}