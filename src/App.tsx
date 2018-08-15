import * as React from 'react';
import EntranceContainer from './containers/EntranceContainer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RouterPathEnum } from './enums/RouterPathEnum';
import BookListContainer from './containers/BookListContainer';
import { RouteComponentProps } from 'react-router';

interface Props {
  isLoggedIn: boolean
}

class App extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  public render() {
    const isLoggedIn: boolean = this.props.isLoggedIn;

    const renderHome = ( props:RouteComponentProps<any> ) => {
      if( isLoggedIn ) {
        return <Redirect to={RouterPathEnum.BOOK_LIST} />;
      }

      return <EntranceContainer {...props} />;
    }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path={RouterPathEnum.HOME}
              render={ (props) => renderHome( props ) } />
            { (!isLoggedIn) ? <Redirect to={RouterPathEnum.HOME} /> : '' }
            <Route path={RouterPathEnum.BOOK_LIST} component={BookListContainer}/>
            <Redirect to={RouterPathEnum.HOME} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
