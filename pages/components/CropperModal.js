import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter } from "@chakra-ui/react";
import { Dialog, AppBar, Toolbar, IconButton, CloseIcon, Typography, List, Slide, ListItem, ListItemText, Divider } from "@mui/material";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <input className="none" ref={inputRef} type="file" onChange={(e) => loadImage(e)} />
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
  return (
    <>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <input className="none" ref={inputRef} type="file" onChange={(e) => loadImage(e)} />
      <Button className="box-bottom" size='sm' onClick={() => inputRef.current.click()}>ファイルを選択</Button>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Cropper
            src={cropSrc}
            style={{ height: 400, width: "100%" }}
            aspectRatio ={1/1}
            guides={false}
            ref={cropperRef}
          />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => onCrop()}>切り取り</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}