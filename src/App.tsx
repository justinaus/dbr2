import * as React from 'react';
import LoginContainer from './containers/LoginContainer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RouterPathEnum } from './enums/RouterPathEnum';
import BookListContainer from './containers/BookListContainer';
import { RouteComponentProps } from 'react-router';
import BookDetail from './components/BookDetail';
import { BookState } from './states/BookState';
import { IUserState } from './states/IUserState';

interface IProps {
  userState: IUserState | null,
  books: BookState[] | null
}

class App extends React.Component<IProps, {}> {
  constructor(props : IProps){
    super(props);
  }

  public render() {
    const isLoggedIn: boolean = this.props.userState !== null;
    
    const renderBookDetail = ( props:RouteComponentProps<any> ) => {
      const userState: IUserState = this.props.userState as IUserState;

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

      return <BookDetail {...props} bookState={ found } userState={ userState } />;
    }

    return (
      <BrowserRouter basename={ process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route path={RouterPathEnum.LOGIN} component={LoginContainer}/>
            { (!isLoggedIn) ? <Redirect to={RouterPathEnum.LOGIN} /> : '' }
            <Route exact={true} path={RouterPathEnum.HOME} component={BookListContainer}/>
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
