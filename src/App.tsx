import * as React from 'react';
import EntranceContainer from './containers/EntranceContainer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RouterPathEnum } from './enums/RouterPathEnum';
import BookListContainer from './containers/BookListContainer';
import { RouteComponentProps } from 'react-router';
import BookDetail from './components/BookDetail';
import { BookState } from './states/BookState';
import { IUserState } from './states/IUserState';

interface IProps {
  userState: IUserState,
  books: BookState[] | null
}

class App extends React.Component<IProps, {}> {
  constructor(props : IProps){
    super(props);
  }

  public render() {
    const isLoggedIn: boolean = this.props.userState.isLoggedIn;

    const renderHome = ( props:RouteComponentProps<any> ) => {
      if( isLoggedIn ) {
        return <Redirect to={RouterPathEnum.BOOK_LIST} />;
      }

      return <EntranceContainer {...props} />;
    }

    const renderBookDetail = ( props:RouteComponentProps<any> ) => {
      if( !this.props.books ) {
        return <Redirect to={RouterPathEnum.HOME} />
      }
      const nId: number = Number( props.match.params.id );
      const books: BookState[] = this.props.books;
      const found: BookState | undefined = books.find( ( element: BookState ) => {
        return element.id === nId;
      } );

      if( !found ) {
        return <Redirect to={RouterPathEnum.HOME} />
      }

      return <BookDetail {...props} bookState={ found } userState={ this.props.userState } />;
    }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path={RouterPathEnum.HOME}
              render={ (props) => renderHome( props ) } />
            { (!isLoggedIn) ? <Redirect to={RouterPathEnum.HOME} /> : '' }
            <Route path={RouterPathEnum.BOOK_LIST} component={BookListContainer}/>
            <Route path={RouterPathEnum.BOOK_DETAIL + '/:id'} 
              render={ (props) => renderBookDetail( props ) }/>
            <Redirect to={RouterPathEnum.HOME} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
