import React from 'react'
import ReactDOM from 'react-dom'
export default class Modal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <div className='modal-root'>
                {this.props.children}
            </div>, document.getElementById('modal-root'))
    }
}