import * as React   from 'react';
import _            from 'lodash';
import { useQuery } from '@apollo/react-hooks';

const HARDCAP = 6000;

function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => { ref.current = value; }, [value]);
    return ref.current;
}

export default (props) => {
    const [ loading, setLoading ] = React.useState(true);
    const [ limit               ] = React.useState(1000);
    const [ offset,  setOffset  ] = React.useState(0);
    const [ results, setResults ] = React.useState(undefined);
    const [ error,   onError    ] = React.useState(undefined);
    const manifest = usePrevious(usePrevious(props.variables));

    React.useEffect(() => setOffset(0), [ props.variables ]);

    const onCompleted = (chunk) => {
        if (props.query.paginated) {
            const oldResults = _.isEqual(manifest, props.variables) ? results : undefined;
            const newResults = props.query.merge(oldResults, chunk);
            const size       = props.query.size(newResults);
            const target     = offset + limit;
            setResults(newResults);
            if (size === target && target < HARDCAP) {
                setOffset(target);
                setLoading(true);
            } else {
                setLoading(false);
            }
        } else {
            setResults(chunk);
            setLoading(false);
        }
    };

    useQuery(
        props.query,
        {
            variables: { ...props.variables, limit, offset },
            onCompleted,
            onError
        }
    );

    return error   ? (props.error   ? props.error  ({ ...props, loading, results, error }) : `Error: ${JSON.stringify(error)}`)
         : loading ? (props.loading ? props.loading({ ...props, loading, results, error }) : `Loading`)
         : results ? React.Children.map(props.children, child => React.isValidElement(child) ? React.cloneElement(child, { ...props, results }) : child)
         : null;
};