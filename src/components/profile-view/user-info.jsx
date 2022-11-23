import React from "react";

export default function UserInfo({ name, email }) {
  return (
    <>
      <p>Username: {name}</p>
      <p>Email: {email}</p>
    </>
  )
}