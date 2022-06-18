import { useEffect } from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import { fetchStream, updateStream } from '../../actions';

const StreamEdit = (props) => {

    useEffect(() => {
        if (!props.stream && props.match.params.id) {
            props.fetchStream(props.match.params.id);
        }
    }, []);

    const onSubmit = (formValues) => {
        props.updateStream({
            ...props.stream,
            ...formValues
        });
    };

    if (!props.stream) {
        return <div>Specified stream not found!</div>
    }
    return (
        <div>
            <h3>Edit Stream</h3>
            <StreamForm onSubmit={onSubmit} initialValues={props.stream} />;
        </div>
        ); 
};

const mapStateToProps = ({ streams }, ownProps) => ({
        stream: streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, {
    fetchStream,
    updateStream
})(StreamEdit);