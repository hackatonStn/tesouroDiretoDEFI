import { Dialog } from "primereact/dialog";

import React from "react";

interface ModalProps {
    visible: boolean;
    header: any;
    footer: any;
    classSize?: string;
    onClose?(): void;


}

interface ModalState {

}

{/* <Dialog focusOnShow={false} visible={this.props.visible} onHide={() => null} header={header} footer={footer} closable={false} contentClassName="overflow-x-hidden"
                className="container h-full w-full  md:w-3/4  xl:w-1/2 2xl:h-4/6 tall:h-1/2 m-2 p-2"  >

<Dialog focusOnShow={false} visible={this.props.visible} onHide={() => null} header={header} footer={footer} closable={false} contentClassName="overflow-x-hidden" blockScroll={true}
                className="container h-full w-full md:w-3/4  xl:w-1/2 2xl:h-4/6 tall:h-1/2  m-2 p-2"  ></Dialog>       


 <Dialog focusOnShow={false} visible={this.props.visible} onHide={() => null} header={header} closable={false} footer={footer} blockScroll={true}
            contentClassName="overflow-x-hidden" className="container h-full w-full m-2 p-2 md:w-3/4  xl:w-1/2 2xl:h-4/6 tall:h-1/2 "  >                              */}


class Modal extends React.Component<ModalProps, ModalState> {

    //state = { :  }


    render() {
        return (
            <Dialog focusOnShow={false} visible={this.props.visible} onHide={() => this.props.onClose ? this.props.onClose() : null} header={this.props.header}
                footer={this.props.footer} closable={false} contentClassName="overflow-x-hidden" blockScroll={true}
                className={`container   ${this.props.classSize ? this.props.classSize : ' w-full md:w-3/4  xl:w-1/2 h-full 2xl:h-4/6 tall:h-1/2 '}  m-2 p-2 `}  >

                <div className="p-1">
                    {this.props.children}
                </div>
            </Dialog >


        );
    }
}

export default Modal;