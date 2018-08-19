import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BookState } from '../states/BookState';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import { getAllBooks } from '../firebase/db';
import InputForm from './InputForm';

interface IProps extends RouteComponentProps<BookList>{
  booksAll: BookState[] | null,
  onBookListChanged: ( books: BookState[] ) => void;
}

interface IState {
  booksFiltered: BookState[],
  isEnabled: boolean
}

class BookList extends React.Component<IProps, IState> {
  constructor(props : IProps){
    super(props);

    this.state = { booksFiltered: [], isEnabled: true };
  }

  componentDidMount() {
    // super.componentDidMount();

    if( !this.props.booksAll ) {
      this.getBookList();
    }
  }

  private makeBookElements = () => (
    this.state.booksFiltered.map((bookModel, i) => {
        return (
          <li key={i}>
            <Link to={ RouterPathEnum.BOOK_DETAIL + '/' + bookModel.id }>{ bookModel.title }</Link>
          </li>
        );
    })
  );

  render() {
    return(
        <div>
          <div>
            search book title:<br/>
            <InputForm 
            buttonText="search" 
            onEnter={this.onEnterInputText}
            isEnabled={this.state.isEnabled}
            />
          </div> 
          <ul>
            { this.makeBookElements() }
          </ul>
        </div> 
    );
  }

  private getBookList = () => {
    this.setState( { isEnabled: false } );

    getAllBooks()
    .then( ( querySnapshot: any ) => {
      const books: BookState[] = [];

      let book: BookState;

      querySnapshot.forEach((doc: any) => {
        book = new BookState( doc.data() );
        books.push( book );
      });

      books.sort( ( a, b ) => {
        return a.id - b.id;
      } );

      this.props.onBookListChanged( books );

      this.setState( { isEnabled: true } );
    } )
    .catch( ( error ) => {
      this.setState( { isEnabled: true } );
    } );
  }

  private onEnterInputText = ( strInput: string ) => {
    if( !this.props.booksAll )  return; 
    const booksAll: BookState[] = this.props.booksAll as BookState[];

    const booksFiltered: BookState[] = booksAll.filter( ( item: BookState ) => {
      return item.title.toUpperCase().includes( strInput.toUpperCase() );
    } );

    this.setState( { booksFiltered: booksFiltered } );
  }
}

export default BookList;
