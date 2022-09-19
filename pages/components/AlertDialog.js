import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button} from '@chakra-ui/react'
import { useRef } from 'react'

export default function Dialog({buttonText, func}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const excuteRef = useRef()
  const excuteFunc = (f) => {
    f()
    onClose()
  }
  return (
    <>
      <Button colorScheme='blue' size='sm' onClick={onOpen}>{buttonText}</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={excuteRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        onEsc={(e) => e.key == 'Enter' && excuteFunc(func)}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{buttonText}します。よろしいですか？</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          {/* {buttonText}します。よろしいですか？ */}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='blue' ref={excuteRef} ml={3} onClick={() => excuteFunc(func)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}