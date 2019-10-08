import React from 'react';
import PRDetailProps from '../models/PRDetailProps';
import useAuth from '../hooks/useAuth';
import Main from './Application';

const PRDetail: React.FC<PRDetailProps> = (props: PRDetailProps) => {
    const [authResult, resetAuth] = useAuth(props);
    console.log(props.groupId);
    return (
        <>
            {authResult.status === 'Authorised' && authResult.jiraV2Api 
            ? <Main prefix={props.groupId} reqID={props.pullRequestId} token={props.token} api={authResult.jiraV2Api}/> 
            : (<>
            <p className={authResult.status === 'Unauthorised' ? 'auth-error' : 'auth-pending'}>
                {authResult.statusMessage}
            </p>
            {authResult.status === 'Unauthorised' ? <p><button onClick={resetAuth}>Login</button></p> : ''}
            </>)
            }
        </>
    );
};

export default PRDetail;