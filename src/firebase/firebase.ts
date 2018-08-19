import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from './config';

if (!firebase.apps.length) {
    firebase.initializeApp( FIREBASE_CONFIG );
}

const db = firebase.firestore();

const settings = {
  timestampsInSnapshots : true
};
db.settings(settings);

export {
    db
}