import * as React   from 'react';
import { useQuery } from '@apollo/react-hooks';
import Filter       from './Filter';

const Fetch = (props) => {
    const [ results, onCompleted ] = React.useState(undefined);
    const [ error,   onError     ] = React.useState(undefined);

    useQuery(
        props.query,
        {
            variables: { id: props.params?.id?.toLowerCase() },
        onCompleted,
        onError
        }
    );

    return Filter(props.render)({ ...props, results, error });
};

export default Fetch;
