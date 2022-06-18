import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import StreamForm from './StreamForm';
import Modal from '../Modal';

const StreamDelete = (props) => {

    useEffect(() => {
        if (!props.stream && props.match.params.id) {
            props.fetchStream(props.match.params.id);
        }
    }, []);

    const onApprove = () => {
        props.deleteStream(props.stream.id);
    };

    if (!props.stream) {
        return <div>Specified stream not found.</div>
    }

    return (
        <Modal>
            <div className="header">Delete Stream</div>
            <div className="content">
                <StreamForm initialValues={props.stream} />
            </div>
            <div className="actions">
                <div className="ui button negative" onClick={onApprove}>Delete</div>
                <div className="ui cancel button">Cancel</div>
            </div>
        </Modal>
    );
};

const mapStateToProps = ({ streams }, ownProps) => ({
    stream: streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);