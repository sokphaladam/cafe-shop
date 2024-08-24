import { ReactElement } from "react";

interface IButton {
  title: string;
  onPress?: (str?: any) => void;
  class?: any;
  invisible?: boolean;
}

interface IProps {
  visible?: boolean;
  title?: string;
  message?: string;
  buttons?: IButton[];
  body?: ReactElement[];
  flush?: boolean;
}

interface ModalProps {
  state: any;
  setModal: (ref: any) => void;
  dialog: (p: IProps) => void;
  confirm: (p: IProps, callBack: (v?: any) => void) => void;
}

export const Modal: ModalProps = {
  state: {
    modal: {},
  },
  setModal: (ref: any) => (Modal.state.modal = ref),
  dialog: (p) => {
    Modal.state.modal.onShow(p);
  },
  confirm: (p: IProps, callBack = (v?: boolean) => {}) => {
    Modal.state.modal.onShow({
      ...p,
      buttons: [
        { title: "Yes", onPress: () => callBack(true), class: "success" },
        { title: "No", onPress: () => callBack(false), class: "danger" },
      ],
    });
  },
};
