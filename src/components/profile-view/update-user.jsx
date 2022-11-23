import React from "react";

export default function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <>
      <p>Update Profile</p>
      <p>Salam Aliykom UpdateUser</p>
      {/* <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
        <h2>Want to change some info?</h2>
        <label>Username:</label>
        <input type='text' name='Username' defultValue={user.Username} onChange={e => handleUpdate(e)} />

        <label>Password:</label>
        <input type='passwordt' name='Password' defultValue={user.Password} onChange={e => handleUpdate(e)} />

        <label>Email address:</label>
        <input type='email' name='email' defultValue={user.Email} onChange={e => handleUpdate(e)} />

        <button vaiant='primary' type='submit'>Update</button>
      </form> */}

    </>
  )
}

//   )
// }