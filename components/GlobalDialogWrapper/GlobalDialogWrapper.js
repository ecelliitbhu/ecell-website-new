import { useSelector, useDispatch } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import { closeDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice';
import Login from './login';





export default function GlobalDialog({children}) {
  const dispatch = useDispatch();
  const { isDialogOpen, dialogType } = useSelector((state) => state.GlobalDialog);

  const handleClose = () => dispatch(closeDialog());

  const renderDialogBody = () => {
    switch (dialogType) {
      case 'login':
        return <Login/>;
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
        <Dialog.Content className="fixed left-1/2 top-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">{'Dialog'}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500">
            {renderDialogBody()}
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleClose}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </>
  );
}
