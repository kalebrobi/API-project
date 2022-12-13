import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoadAllSpots from "./components/LoadAllSpots";
import ShowSpot from "./components/ShowSpots";
import spotsReducer from "./store/spots";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={'/spots'} component={LoadAllSpots} />
          <Route exact path={'/spots/:spotId'} component={ShowSpot} />
          {/* </Route> */}

        </Switch>
      )}
    </>
  );
}

export default App;
