// UserInfo.js

import {
  Input,
  SpaceBetween,
  Header,
  Container,
  FormField,
  DateInput,
  Select,
} from "@cloudscape-design/components";

import { RoleType, UserActions, UserInfoType } from "../../types/userform";
import React from "react";

type UserInfoProps = {
  userInfo: UserInfoType;
  userRole: RoleType;
  dispatch: React.Dispatch<UserActions>;
};
const UserInfo: React.FC<UserInfoProps> = React.memo(
  ({ userInfo, userRole, dispatch }) => {

    console.log("USER INFO COMPONENT");

    const roleOptions = [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
    ];
    
    const getSelectedRole = () => {
      const selectedRole =
        roleOptions.find((role) => role.value === userRole) ?? roleOptions[0];
      return selectedRole;
    };
    const handleInputChange = (field: string, value: string) => {
      dispatch({
        type: "UPDATE_INFO",
        payload: { [field]: value },
      });
    };
    const handleRoleChange = (role: RoleType) => {
      dispatch({
        type: "UPDATE_ROLE",
        payload: role,
      });
    };

    return (
      <Container header={<Header variant="h2">User Info</Header>}>
        <SpaceBetween direction="vertical" size="l">
          <FormField label="Name">
            <Input
              value={userInfo.name}
              onChange={({ detail }) => handleInputChange("name", detail.value)}
            />
          </FormField>
          <FormField label="Email">
            <Input
              value={userInfo.email}
              onChange={({ detail }) =>
                handleInputChange("email", detail.value)
              }
            />
          </FormField>
          <FormField label="DOB" constraintText="Use YYYY/MM/DD format.">
            <DateInput
              onChange={({ detail }) => handleInputChange("dob", detail.value)}
              value={userInfo.dob}
              placeholder="YYYY/MM/DD"
            />
          </FormField>
          <FormField label="Role">
            <Select
              onChange={({ detail }) =>
                handleRoleChange(detail.selectedOption.value as RoleType)
              }
              selectedOption={getSelectedRole()}
              options={roleOptions}
            />
          </FormField>
        </SpaceBetween>
      </Container>
    );
  }
);

export default UserInfo;
