
import Router from "next/router";
import React from "react";

const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';


const handleWindowClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = warningText);
};
const handleBrowseAway =  () => {
    
    // if (window.confirm(warningText)) return;
    Router.events.emit('routeChangeError');
    //push state, because browser back action changes link and changes history state
    // but we stay on the same page
    if (Router.asPath !== window.location.pathname) {
        window.history.pushState('', '', Router.asPath);
    }
    throw 'routeChange aborted.';
};


interface ModalHeaderProps {
    onClose(): void;
    title: string
}

interface ModalHeaderState {
    css: string
}

class ModalHeader extends React.Component<ModalHeaderProps, ModalHeaderState> {


    componentDidMount() {
        window?.addEventListener('beforeunload', handleWindowClose);
        Router.events.on('routeChangeStart', handleBrowseAway);
    }

    componentWillUnmount() {
         window.removeEventListener('beforeunload', handleWindowClose);
       Router.events.off('routeChangeStart', handleBrowseAway);
    }



    render() {
        return (
            <>

                <div className={` h-12  md:h-24 bg-base-200 dark:bg-base-400 flex flex-row animate__animated  animate__pulse border-b-2  `}>
                    <div className="w-8" />
                    <div className=" flex flex-col justify-center flex-grow">
                        <p className="text-2xl text-neutral text-center">{this.props.title}</p>
                    </div>
                    <div className="w-8 animate__animated  animate__flip ">
                        {/* <Translate type="up" duration={200} delay={1000}> */}
                        <i className="bi bi-x-circle text-neutral text-2xl cursor-pointer " onClick={() => this.props.onClose()}></i>
                        {/* </Translate> */}

                    </div>
                    {this.props.children}
                </div>

            </>
        );
    }
}

export default ModalHeader;