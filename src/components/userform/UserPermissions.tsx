import {
  Checkbox,
  Container,
  FormField,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { RoleType, UserActions, UserPermissionsType } from "../../types/userform";


import React from "react";

type UserPermissionsProps = {
    permissions: UserPermissionsType;
    role: RoleType;
    dispatch: React.Dispatch<UserActions>; 
  };
  
interface IPermission{
    checkBoxName: string,
    permission: "edit" | "delete"
}  
const UserPermissions: React.FC<UserPermissionsProps> = React.memo(({permissions, role,  dispatch}) => {
  const userPermissionsObject:IPermission[] = [
    {
      checkBoxName: "Allow Edit",
      permission:"edit"
    },
    {
        checkBoxName: "Allow Delete",
        permission:"delete"
      },
  ];
  console.log("USER PERMISSIONS COMPONENT")
  
    const handleCheckedChange = (field: string, value: boolean) => {
        dispatch({
            type: "UPDATE_PERMISSIONS",
            payload: { [field]: value },
          });
         
    }
  return (
    <Container
      header={
        <Header variant="h2" description="Allows user to enable manage">
          User Permissions
        </Header>
      }
    >
      <SpaceBetween direction="horizontal" size="l">
        {userPermissionsObject.map((permission) => {
          return (
            <FormField  key={permission.permission}>
              <Checkbox
                onChange={({ detail }) => handleCheckedChange(permission.permission, detail.checked)}
                checked={permissions[permission.permission]}
                disabled={role==="user"}
              >
                {permission.checkBoxName}
              </Checkbox>
            </FormField>
          );
        })}
      </SpaceBetween>
    </Container>
  );
});
export default UserPermissions;
