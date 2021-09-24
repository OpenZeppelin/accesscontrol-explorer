import * as React   from 'react';
import queryString  from 'query-string';

export default (props) => {
    const [ params, setParams ] = React.useState({});

    React.useEffect(() => {
        setParams(queryString.parse(props.routing.location.search));
    }, [ props.routing.location.search ])

    return React.Children.map(props.children, child => React.isValidElement(child)
          ? React.cloneElement(child, { ...props, params })
       : child
    );
};