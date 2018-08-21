import { db } from "./firebase";

export async function saveRent( isReturningBook: boolean, bookId: number, userLdap: string, date: Date ): Promise<any> {
    return new Promise<any>( resolve => {
        db.collection("rentals").add({
            isReturningBook : isReturningBook,
            bookId: bookId,
            userLdap: userLdap,
            date: date
        })
        .then(function(docRef) {
            resolve( docRef );
        })
        .catch(function(error) {
            console.error(error);
            resolve( error );
        });
    } );
}

export async function getAllBooks(): Promise<any> {
    return new Promise<any>( resolve => {
        db.collection("books").get()
        .then((querySnapshot) => {
            resolve( querySnapshot );
            // querySnapshot.forEach((doc) => {
            //     console.log(`${doc.id} => ${doc.data()}`);
            // });
        })
        .catch( (error) => {
            console.error(error);
            resolve( error );
        } );
    } );
}