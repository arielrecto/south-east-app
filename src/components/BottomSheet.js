import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";


import { useRef, useMemo } from "react";

export const BottomSheet = ({children, isOpen}) => {
  const bottomSheetModalRef = useRef < BottomSheetModal > null;

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);



  {isOpen ? bottomSheetModalRef.current?.present() : bottomSheetModalRef.current?.close()}

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
      >
        <BottomSheetView>
            {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
