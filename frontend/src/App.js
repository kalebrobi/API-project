import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoadAllSpots from "./components/LoadAllSpots";
import ShowSpots from "./components/ShowSpots";
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
          {/* <Route exact path={['/', '/spots']} component={} /> */}
          {/* <Route exact path={'/spots/:spotId'} component={ShowSpots} /> */}
          <Route  exact path={['/', '/spots']} >
            <LoadAllSpots />
          </Route>
          <Route  path={'/spots/:spotId'} >
            <ShowSpots />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
