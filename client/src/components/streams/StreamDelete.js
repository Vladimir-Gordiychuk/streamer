import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = (props) => {

    useEffect(() => {
        if (!props.stream && props.match.params.id) {
            props.fetchStream(props.match.params.id);
        }
    }, []);

    const onApprove = () => {
        props.deleteStream(props.stream.id);
    };

    const onCancel = () => {
        history.goBack();
    }

    if (!props.stream) {
        return <div>Specified stream not found.</div>
    }

    return (
        <Modal onExit={onCancel}>
            <div className="header">Are you sure that you want to delete this Stream?</div>
            <div className="content">
                <h4>{props.stream.title}</h4>
                <p>
                    {props.stream.description}
                </p>
            </div>
            <div className="actions">
                <div className="ui button negative" onClick={onApprove}>Delete</div>
                <div className="ui cancel button" onClick={onCancel}>Cancel</div>
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