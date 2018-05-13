import React from 'react'
import Modal from '../../containers/ModalContainer';

export default class AlbumModal extends React.Component {
    render() {
        return <Modal>
            <div>Modal!</div>
            <button onClick={() => this.props.closeModal()}>Close modal</button>
        </Modal>
    }
}