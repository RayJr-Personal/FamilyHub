import { useState, useEffect } from 'react';

import { Spinner } from '@/components/Spinner';
import { Link } from '@/components/Link';
import { userService } from '@/services/user.service';
import { Spinner } from '@/components/Spinner';


export default function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <>
            <h1>Users</h1>
            <Link href="/users/add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <Spinner />
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}