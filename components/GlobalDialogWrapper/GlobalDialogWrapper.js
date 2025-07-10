import { useSelector, useDispatch } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import { closeDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice';
import Login from './login';
import Referral from './referral';
import Image from 'next/image'





export default function GlobalDialog({children}) {
  const dispatch = useDispatch();
  const { isDialogOpen, dialogType,title } = useSelector((state) => state.GlobalDialog);
  const handleClose = () => dispatch(closeDialog());

  const renderDialogBody = () => {
    console.log(dialogType);

    switch (dialogType) {
      case 'login':
        return <Login/>;
      case 'campusambassador':
        return <Referral/>;
      default:
        return <p>Default Content</p>;
    }
  };

  return (
    <>
    {children}
    <Dialog.Root open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-w-full w-auto -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Close asChild>
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-red-500 text-2xl font-bold hover:text-red-700 "
                style={{ marginLeft: '30px' }}
              >
                <Image 
            src="https://ik.imagekit.io/ecelliitbhu/website/image2.jpeg"
            alt="Google Logo" 
            width={35} 
            height={35} 
          
          />
              </button>
            </Dialog.Close>
          <Dialog.Description className="text-sm text-gray-500">
            {renderDialogBody()}
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </>
  );
}
