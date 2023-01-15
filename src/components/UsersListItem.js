import Button from "./Button";
import { GoTrashcan } from "react-icons/go";

import useThunk from "../hooks/use-thunk";
import { removeUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doRemoveItem, isLoading, error] = useThunk(removeUser);

  const handleDeleteItem = () => {
    doRemoveItem(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleDeleteItem}>
        <GoTrashcan />
      </Button>
      {error ? "Error Removing User" : ""}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
