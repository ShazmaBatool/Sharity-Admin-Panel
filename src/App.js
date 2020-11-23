import React from "react";
import Routes from "./routes";
import firebase from "firebase";
import firebaseConfig from "./firebase";
import { AuthContext } from "./context";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [isAuthorized, setIsAuthorized] = React.useState(null);
  // const dispatch = useDispatch();
  const authListener = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthorized(user);
        // dispatch(saveUser({ user: user }));
      } else {
        setIsAuthorized(null);
        // dispatch(saveUser({ user: null }));
      }
    });
  };

  const authContext = React.useMemo(() => {
    return {
      SignIn: (user) => {
        setIsAuthorized(user);
      },
      SignUp: (user) => {
        setIsAuthorized(user);
      },
      SignOut: () => {
        setIsAuthorized(null);
      },
    };
  }, []);

  React.useEffect(() => {
    authListener();
  });

  return (
    <AuthContext.Provider value={authContext}>
      <Routes isAuthorized={isAuthorized} />
    </AuthContext.Provider>
  );
}

export default App;
