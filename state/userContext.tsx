import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GetUserDataService } from 'services/user/getUserService';
import { UpdateUserDataService } from 'services/user/updateUserService';
import StatusCode from 'types/statusCodes';
import { User } from 'types/user';

type UserDataContextType = {
  name: string;
  updateUserName: (newName: string) => void;
};

const UserDataContext = createContext<UserDataContextType>({
  name: '',
  updateUserName: (newName: string) => undefined,
});

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      const initialUser = await GetUserDataService();
      if (initialUser !== StatusCode.FAIL) {
        setName(initialUser.name);
      }
    };
    initialLoad().catch((e) => console.error(e));
  }, []);

  const updateUserName = async (newName: string) => {
    const updatedUser = {
      name: newName,
    } as User;
    const response = await UpdateUserDataService({ updatedUser });
    if (response !== StatusCode.FAIL) {
      setName(newName);
    }
  };

  const values: UserDataContextType = useMemo(
    () => ({
      name,
      updateUserName,
    }),
    [name]
  );

  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserContext = (): UserDataContextType => {
  return useContext(UserDataContext);
};
