import React from 'react'
import { toast } from 'react-toastify';

function UserRow({index, user, refetch}) {
    const {email, role} = user;
    const makeAdmin=()=>{
        fetch(`http://localhost:5000/user/admin/${email}`,{
            method: 'PUT',
            headers:{
                'authorization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
            if(res.status === 403){
                toast.error("failed to make admin")
            }
            return res.json()})
        .then(data=>{
            if(data.modifiedCount>0){
                console.log(data);
                refetch()
                toast.success("successfully admin maked")
            }
            
        })
    }
  return (
    <tr className="hover">
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
      {role !=="admin"  ? <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button> : <button className="btn btn-xs  btn-success">already admin</button>}
      </td>
      <td>
        <button className="btn btn-xs btn-error">Remove User</button>
      </td>
    </tr>
  )
}

export default UserRow