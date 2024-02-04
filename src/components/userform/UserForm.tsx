import UserAddress from "./UserAddress";
import UserInfo from "./UserInfo";

import UserPermissions from "./UserPermissions";
import {
  AppLayout,
  Button,
  ContentLayout,
  Form,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useUserContext } from "../../context/useUserContext";

const UserForm = () => {
  const { state, dispatch } = useUserContext();
  const handleSubmitForm = () => {
    console.log(state, 'new state with user info');
    if(state.info.name && state.info.email){
      dispatch({ type: "CREATE_NEW_USER" });
    }
    
  };
  return (
    <AppLayout
      toolsHide={true}
      navigationHide={true}
      content={
        <ContentLayout
          // header={
          //   <Header
          //     variant="h1"
          //     description={
          //       <>
          //         This React app uses the Cloudscape Design System components.
          //         Learn more in{" "}
          //       </>
          //     }
          //   >
          //     Hello from Cloudscape
          //   </Header>
          // }
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button formAction="none" variant="link">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmitForm}>
                    Submit Form
                  </Button>
                </SpaceBetween>
              }
              header={<Header variant="h1">Create User</Header>}
            >
              <SpaceBetween direction="vertical" size="m">
              <UserInfo userInfo={state.info} userRole={state.role} dispatch={dispatch}/>
              <UserAddress address={state.address} dispatch={dispatch}/>
              {/* <Friends /> */}
              <UserPermissions permissions={state.permissions} role={state.role} dispatch={dispatch}/>
              </SpaceBetween >
            </Form>
          </form>
        </ContentLayout>
      }
    />
  );
};

export default UserForm;
