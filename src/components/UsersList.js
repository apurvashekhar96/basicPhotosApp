import { useSelector } from "react-redux";

import { fetchUsers, addUser } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doAddUsers, isCreatingUsers, creatingUsersError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUsers();
  };

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={10} className="h-10 w-full"></Skeleton>;
  } else if (loadingUsersError) {
    content = <div>Opps Some Error in fetching</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user}></UsersListItem>;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUsers} onClick={handleAddUser}>
          + Add User
        </Button>

        {creatingUsersError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
