import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
export default class Modal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <div className='modal-root'>
                <i className='material-icons modal-close-button'
                    onClick={this.props.closeModal}>close</i>
                {this.props.children}
            </div>, document.getElementById('modal-root'))
    }
}