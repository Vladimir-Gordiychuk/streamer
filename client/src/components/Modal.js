import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {

    const modal = useRef();

    const onClick = (event) => {
        if (modal.current.contains(event.target))
            return;

        props.onExit();
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={onClick}>
            <div ref={modal} className="ui standard modal visible active">
                {props.children}
            </div>
        </div>,
        document.querySelector('#modal')
    );
};


export default Modal;