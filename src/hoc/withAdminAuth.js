import {useAdminAuth} from './../customHooks/index'

const WithAdminAuth = props => useAdminAuth(props) && props.children



export default WithAdminAuth;