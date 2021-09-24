import Account     from './Account.js';
import AccountRole from './AccountRole';
import Role        from './Role';

const View = (props) => {
    const flag = [
        props.params.address,
        props.params.role,
    ].reduce((acc, value, i) => acc | (!!value ? 2**i : 0), 0);

    switch (flag) {
        case 1: return Account(props);
        case 2: return Role(props);
        case 3: return AccountRole(props);
        default:
            return null; // invalid params
    }
}

export default View;