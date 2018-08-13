import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface Props extends RouteComponentProps<BookList>{
  
}

class BookList extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  render() {
    return(
        <div>
          <h2>book list</h2>
        </div> 
    );
  }
}

export default BookList;
