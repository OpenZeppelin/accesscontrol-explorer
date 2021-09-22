const Filter  = (Comp) => (props) => props.error
    ? Error(props)
    : props.results
    ? Comp(props)
    : Loading(props);

const Error   = (props) => `Error ${props.error}`
const Loading = (props) => `Loading`

export default Filter;