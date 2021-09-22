import * as React   from 'react';
import { useQuery } from '@apollo/react-hooks';
import Filter       from './Filter';

const HARDCAP = 6000;

const FetchPaginated = (props) => {
  const [ loading, setLoading ] = React.useState(true);
  const [ limit               ] = React.useState(1000);
  const [ offset,  setOffset  ] = React.useState(0);
  const [ results, setResults ] = React.useState(undefined);
  const [ error,   onError    ] = React.useState(undefined);

  // Cleanup on change
  React.useEffect(() => {
    setLoading(true);
    setOffset(0);
    setResults(undefined);
    onError(undefined);
  }, [ props.query, props.variables ])

  // Process new page
  const onCompleted = (data) => {
    const newResults = props.merge(results, data);
    const length     = props.limit(newResults);
    const target     = offset + limit;

    setResults(newResults);
    if (length === target && target < HARDCAP) {
      setOffset(target);
    } else {
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

  return Filter(props.render)({ ...props, loading, results, error });
}

export default FetchPaginated;