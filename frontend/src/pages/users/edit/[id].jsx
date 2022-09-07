import { useState, useEffect } from 'react';

import { AddEdit } from '@/components/users/AddEdit';
import { Spinner } from '@/components/Spinner';
import { userService } from '@/services/user.service';
import { alertService } from '@/services/alert.service';

export default Edit;

function Edit({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner /> }
        </>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}