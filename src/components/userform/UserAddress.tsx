import {
    Input,
    SpaceBetween,
    Header,
    Container,
    FormField,

  } from "@cloudscape-design/components";
import React from "react";
import { AddressType, UserActions } from "../../types/userform";
type UserAddressProps = {
    address: AddressType;
    dispatch: React.Dispatch<UserActions>; 
  };
const UserAddress: React.FC<UserAddressProps> = React.memo(({address, dispatch})=>{
    console.log("USER ADDRESS COMPONENT")
    const handleInputChange = (field: string, value: any) => {
        dispatch({
            type: "UPDATE_ADDRESS",
            payload: { [field]: value },
          });
          
    }
    return(
        <Container header={<Header variant="h2">User Address</Header>}>
        <SpaceBetween direction="vertical" size="l">
          <FormField label="Street Line1">
            <Input
            data-testid="street-line1-input"
              value={address.street.line1}
              onChange={({ detail }) => handleInputChange("street", { ...address.street, line1: detail.value })}
            />
          </FormField>
          <FormField label="Street Line2">
            <Input
              value={address.street.line2}
              onChange={({ detail }) => handleInputChange("street", { ...address.street, line2: detail.value })}
            />
          </FormField>
          <FormField label="City">
            <Input
              data-testid="city-input"
              value={address.city}
              onChange={({ detail }) => handleInputChange("city", detail.value)}
            />
          </FormField>
          <FormField label="State">
            <Input
              data-testid="state-input"
              value={address.state}
              onChange={({ detail }) => handleInputChange("state", detail.value)}
            />
          </FormField>
         
        </SpaceBetween>
      </Container>
    )
})
export default UserAddress;