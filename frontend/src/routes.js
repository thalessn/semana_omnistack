import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

//A palavra exact no primeiro component do switch é para
//especificar que rota tem que ser idêntica a passada pelo usuário.
function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/new" component={New} />
        </Switch>
        
    );
}

export default Routes; 