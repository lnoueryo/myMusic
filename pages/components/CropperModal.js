import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter } from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function CropperModal({setSrc}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
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
    onOpen()
  }
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setSrc(cropper.getCroppedCanvas().toDataURL())
    onClose()
    setCropSrc('')
  };

  return (
    <>
      <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e) => loadImage(e)} />
      <Button size='sm' style={{marginTop: 'auto'}} onClick={() => inputRef.current.click()}>ファイルを選択</Button>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Cropper
            src={cropSrc}
            // src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
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