import { StylesProviders } from './StylesProviders';
import { RouterWithContext } from './RouterWithContext';
import { UserProvider } from './UserProvider';

export function ProvidersWithRouter () {
  return (
    <UserProvider>
      <StylesProviders>
        <RouterWithContext />
      </StylesProviders>  
    </UserProvider>
  );
}
