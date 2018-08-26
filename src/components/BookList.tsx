import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BookState } from '../states/BookState';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import { getAllBooks } from '../firebase/db';
import InputForm from './InputForm';
import './BookList.css';
import BookItem from './BookItem';
import LazyLoad from 'react-lazyload';

interface IProps extends RouteComponentProps<BookList>{
  booksAll: BookState[] | null,
  onBookListChanged: ( books: BookState[] ) => void;
  wordSearched: string | null;
  onSaveWordSearched: ( wordSearched: string ) => void;
}

interface IState {
  booksFiltered: BookState[],
  isEnabled: boolean
}

class BookList extends React.Component<IProps, IState> {
  private itemHeight: number = 80;

  constructor(props : IProps){
    super(props);

    this.state = { booksFiltered: [], isEnabled: true };
  }

  componentDidMount() {
    if( !this.props.booksAll ) {
      this.getBookList();
    } else if( this.props.wordSearched ) {
      this.searchWord( this.props.wordSearched );
    }
  }

  private makeBookElements = () => (
    this.state.booksFiltered.map((bookModel, i) => {
        return (
          <LazyLoad height={ this.itemHeight } key={i} >
            <BookItem 
            bookState={ bookModel } 
            onClick={this.onClickItem}
            />
          </LazyLoad>
        );
    })
  );

  private loadSampleForItemHeight = () => {
    if( !this.props.booksAll ||  this.props.booksAll.length < 1 ) {
      return '';
    }

    const onCompleteRender = ( item: BookItem, nHeight:number ) => {
      this.itemHeight = nHeight;
      item.hide();
    } 

    return (
      <BookItem
      bookState={ this.props.booksAll[ 0 ] }
      onClick={this.onClickItem}
      onCompleteRender={ onCompleteRender }
      />
    );
  }

  render() {
    return(
        <div>
          { this.loadSampleForItemHeight() } 
          <div>
            search book title:<br/>
            <InputForm 
            buttonText="search" 
            onEnter={this.onEnterInputText}
            isEnabled={this.state.isEnabled}
            startInputWord={this.props.wordSearched}
            />
          </div>
          <ul>
            { this.makeBookElements() }
          </ul>
        </div> 
    );
  }

  private onClickItem = ( bookState: BookState ) => {
    this.props.history.push( RouterPathEnum.BOOK_DETAIL + "/" + bookState.id );
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

    this.props.onSaveWordSearched( strInput );

    this.searchWord( strInput );
  }

  private searchWord = ( strWord: string ) => {
    const booksAll: BookState[] = this.props.booksAll as BookState[];

    const booksFiltered: BookState[] = booksAll.filter( ( item: BookState ) => {
      return item.title.toUpperCase().includes( strWord.toUpperCase() );
    } );

    this.setState( { booksFiltered: booksFiltered } );
  }
}

export default BookList;
