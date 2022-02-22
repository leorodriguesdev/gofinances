import React, { 
    createContext, 
    ReactNode,
    useContext,
//    useState
} from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
}


interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;

}


interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
    params: {
    access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    {/* 
    =============Comentado para debugar o erro de autenticação============
    const [user, setUser] = useState<User>({} as User);
    
    */}

    const user = {
        id: '1',
        name: 'Fulano',
        email: 'leo@leo.com',
        photo: 'https://avatars2.githubusercontent.com/u/63977?s=460&u=f9f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8&v=4'
    };

    async function signInWithGoogle(){
        try {       
            const CLIENT_ID = '513489943734-19evtfkti5reuq8bmbd3oh56d1e2pkot.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@leorodriguesdev/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;

            if( type === 'success' ) {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&acess_token=${params.access_token}`);
                const userInfo = await response.json();
                console.log(userInfo);

                {/* 

                ======Comentado para debugar o erro de autenticação====
                setUser({
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture,
                });
                
                */}
            }
            } catch (error) {
            throw new Error(error as string);
            }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle
            }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}


export { useAuth, AuthProvider };