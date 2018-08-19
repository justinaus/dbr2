import { db } from "./firebase";

export async function saveRent( bookId: number, userLdap: string, rentalData: Date ): Promise<any> {
    return new Promise<any>( resolve => {
        db.collection("rentals").add({
            bookId: bookId,
            userLdap: userLdap,
            rentalData: rentalData
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