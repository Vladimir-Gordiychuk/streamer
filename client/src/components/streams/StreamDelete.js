import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamDelete = (props) => {

    useEffect(() => {
        if (!props.stream && props.match.params.id) {
            props.fetchStream(props.match.params.id);
        }
    }, []);

    const onSubmit = (formValues) => {
        props.deleteStream(props.stream.id);
    };

    if (!props.stream) {
        return <div>Specified stream not found.</div>
    }

    return (
        <div>
            <h3>Delete Stream</h3>
            <StreamForm onSubmit={onSubmit} initialValues={props.stream} />
        </div>
    );
};

const mapStateToProps = ({ streams }, ownProps) => ({
    stream: streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);