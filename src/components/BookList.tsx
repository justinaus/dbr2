import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<BookList>{
  
}

class BookList extends React.Component<IProps, {}> {
  constructor(props : IProps){
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
