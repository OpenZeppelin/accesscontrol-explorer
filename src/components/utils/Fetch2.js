import * as React   from 'react';
import { useQuery } from '@apollo/react-hooks';
import Filter       from './Filter';



const Feed = (props) => {

    React.useEffect(() => {
        console.log("here")
        if (props.results) {
            const length = Math.max(
                props.results?.account?.ownerOf.length,
                props.results?.account?.membership.length,
                props.results?.account?.asAccessControl?.roles.length,
            );
            console.log(length)
            props.onLoadMore(length).then(console.log);
        }
    }, [ props.results ]);

    // if (!props.loading) {
    //     props.onLoadMore(1).then(x => console.log(x.variables));
    //     // console.log(x)
    // }


    return props.loading ? 'Loading' : JSON.stringify(props.results);
}




const merge = (prev, opts) => {
    console.log("merge")
    if (prev.account?.ownerOf) {
        prev.account?.ownerOf.push(...opts.fetchMoreResult.account?.ownerOf)
    }
    if (prev.account?.membership) {
        prev.account?.membership.push(...opts.fetchMoreResult.account?.membership)
    }
    if (prev.account?.asAccessControl) {
        prev.account?.asAccessControl?.roles.push(...opts.fetchMoreResult.account?.asAccessControl?.roles)
    }
    return prev;
}



const Fetch = (props) => {
    const limit = 1;

    const { loading, data, error, fetchMore } = useQuery(
        props.query,
        {
            variables: { ...props.variables, offset: 0, limit },
        }
    );

    return <Feed
        loading    = { loading   }
        results    = { data      }
        error      = { error     }
        onLoadMore = {
            (offset) => fetchMore({
                variables: { ...props.variables, offset },
                updateQuery: merge,
            })
        }
        {...props}
    />;
    // return results ? JSON.stringify(results, null, 4) : "loading";
    // return Filter(props.render)({ ...props, results, error });
};

export default Fetch;




// const FetchPaginated = (props) => {
//   const [ loading, setLoading ] = React.useState(true);
//   const [ first               ] = React.useState(1000);
//   const [ offset,  setOffset  ] = React.useState(0);
//   const [ results, setResults ] = React.useState(undefined);
//   const [ error,   onError    ] = React.useState(undefined);

//   // Cleanup on change
//   React.useEffect(() => {
//     setLoading(true);
//     setOffset(0);
//     setResults(undefined);
//     onError(undefined);
//   }, [ props.query, props.variables ])

//   // Process new page
//   const onCompleted = (data) => {
//     const { results: newResults, length } = props.merge(results, data);
//     setResults(newResults);
//     if (length === first && offset + first < HARDCAP) {
//       setOffset(offset + first);
//     } else {
//       setLoading(false);
//     }
//   };

//   useQuery(
//     props.query,
//     {
//       variables: { ...props.variables, first, offset },
//       onCompleted,
//       onError
//     }
//   );

//   return Filter(props.render)({ ...props, loading, results, error });
// }

// export default FetchPaginated;