import React from "react";
import Parent from "./components/props/Parent";
import FormContainer from "./components/PropsFunction/FormContainer";
import ProfileContainer from "./components/PropsExample/ProfileContainer";
import CardContainer from "./components/PropsFunction/CardContainer";

export default function App() {
  return (
    <div>
      {/* <Parent></Parent> */}
      <FormContainer></FormContainer>
      <br />
      <hr />
      <br />
      <ProfileContainer></ProfileContainer>
      <br />
      <hr />
      <br />
      <CardContainer></CardContainer>
      <br />
      <hr />
      <br />
    </div>
  );
}
