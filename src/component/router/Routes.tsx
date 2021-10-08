import React from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {SongPage} from "../pages/SongPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthorPage from "../pages/AuthorPage";

export const PATH = {
    ALL_ROUTES: '*',
    SONGS: '/songs',
    AUTHORS: '/authors',
    NOTFOUND: '/404',
};

const Routes: React.FC = () => {

    return (
        <div>
            <Switch>
                <Route path={PATH.SONGS} render={() => <SongPage/>}/>
                <Route path={PATH.AUTHORS} render={() => <AuthorPage/>}/>
                <Route path={PATH.NOTFOUND} render={() => <NotFoundPage/>}/>
                <Route path={'/'} exact render={() => <AuthorPage/>}/>
                {/*<Route path={PATH.SONGS + '/:id'} exact={true} component={DestinationProfileContainer} />*/}
                <Redirect from={PATH.ALL_ROUTES} to={PATH.NOTFOUND}/>
            </Switch>
        </div>
    );
};

export default Routes
