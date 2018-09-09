import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BookState } from '../../states/BookState';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import { getAllBooks } from '../../firebase/db';
import './BookList.css';
import BookItem from './bookItem/BookItem';
import Input from '../../ui-components/Input';
import Button, { ButtonTypeEnum } from '../../ui-components/button/Button';

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
  private currentText: string = "";

  constructor(props : IProps){
    super(props);

    this.state = { booksFiltered: [], isEnabled: true };
  }

  componentDidMount() {
    if( !this.props.booksAll ) {
      this.getBookList();
    } else if( this.props.wordSearched !== null ) {
      this.searchWord( this.props.wordSearched );
    } else {
      this.onChangeInputHandler( "" );
    }
  }

  private makeBookElements = () => (
    this.state.booksFiltered.map((bookModel, i) => {
        return (
          <BookItem 
          key={i}
          bookState={ bookModel } 
          onClick={this.onClickItem}
          />
        );
    })
  );

  render() {
    return(
        <div className="container">
          <div className="topSearch">
            <h3>도서 목록</h3>
            <div>
                <Input
                    isEnabled={ this.state.isEnabled }
                    onEnterKey={ () => this.searchWord( this.currentText ) }
                    cssProperty={ { marginRight: 10, marginTop: '10px' } }
                    defaultValue={this.props.wordSearched !== null ? this.props.wordSearched : undefined}
                    onChange={ ( e ) => this.onChangeInputHandler( e.currentTarget.value ) }
                />
                <Button
                    buttonType={ ButtonTypeEnum.OUTLINE }
                    text="조회"
                    onClick={ () => this.searchWord( this.currentText ) }
                    isEnabled={this.state.isEnabled}
                />
            </div> 
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

      // 그냥 전체 리스트 보여주는 걸로 시작.
      this.onChangeInputHandler( "" );

      this.setState( { isEnabled: true } );
    } )
    .catch( ( error ) => {
      this.setState( { isEnabled: true } );
    } );
  }

  private onChangeInputHandler = ( strInput: string ) => {
    this.currentText = strInput;

    this.searchWord( strInput );
  }
  
  private searchWord = ( strWord: string ) => {
    // if( !this.state.isEnabled )  return;
    if( !this.props.booksAll )  return; 

    this.props.onSaveWordSearched( strWord );

    const booksAll: BookState[] = this.props.booksAll as BookState[];

    const booksFiltered: BookState[] = booksAll.filter( ( item: BookState ) => {
      return item.title.toUpperCase().includes( strWord.toUpperCase() );
    } );

    this.setState( { booksFiltered: booksFiltered } );
  }
}

export default BookList;
