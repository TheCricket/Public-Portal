import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const User = require('./User');

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let complaintsRef = db.collection(process.env.VUE_APP_COMPLAINTS);

export const complaints = {};
export var isAdmin = false;

//const user = firebase.auth().currentUser;

/**
 * Checks user submitted PIN against Firestore saved PIN
 * @params 5 Digit PIN
 */
export function login(pin){

  return new Promise((resolve, reject) => {
    db.collection("utils").doc(process.env.VUE_APP_PIN_DOCUMENT).get().then(
      function(doc){
        let pinRef = doc.data().pin;
        if (typeof pin === "string"){
          if (pin == pinRef) {
            resolve(true);
          } else if (pin == doc.data().admin) {
            isAdmin = true;
            resolve(true)
          } else {
            window.alert("Incorrect PIN");
            reject(false);
          }
        } else {
          window.alert("Invalid PIN");
          reject(false);
        }
      }
    )
  });
}

/**
 * 
 * @param {*} username 
 * @param {*} pin 
 * @param {*} isAdmin 
 */
export function createUser(username, pin, isAdmin) {
  db.collection('users').doc().withConverter(User.userConverter).set(new User.User(username, pin, isAdmin));
}

export function updateUserPin(username, pin) {
  db.collection('users').where('username', '==', username).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.update({
        pin: pin
      })
    })
  })
}

export function promoteUser(username) {
  db.collection('users').where('username', '==', username).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.update({
        isAdmin: true
      })
    })
  })
}

export function demoteUser(username) {
  db.collection('users').where('username', '==', username).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.update({
        isAdmin: false
      })
    })
  })
}

export function updateUsername(oldName, newName) {
  db.collection('users').where('username', '==', oldName).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.update({
        username: newName
      })
    })
  })
}

/**
 * Gets all complaints
 * @returns Object with 2 Map<ID, Object> of Complaints
 */
export function getComplaints() {
  this.complaints.unresolved = getUnresolvedComplaints();
  this.complaints.resolved = getResolvedComplaints();

  return this.complaints;
}


/**
 * Gets Unresolved Complaints
 * @returns Map<ID, Object> of Complaints
 * */
export function getUnresolvedComplaints() {
  const unresolved = [];

  complaintsRef.where("resolved", "==", false).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        unresolved.push(thisComplaint)
      })
    }
  )
  return unresolved;
}

export function countCalls() {
  db.collection("complaints").get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {

        // Try to find number in Stats 
        if(doc.data().phone !== ""){
          db.collection('phone_num_stats').doc(doc.data().phone).get().then(
            function(d){
              // Check if number has been used already
              if(d.exists){
                // Doc exists
                // Add to num_calls
                db.collection('phone_num_stats').doc(doc.data().phone).update({
                  num_calls: d.data().num_calls + 1
                })
              } else {
                // Doc doesn't exist
                // Add doc
                db.collection('phone_num_stats').doc(doc.data().phone).set({
                  num_calls: 1
                })
              }
            }
          )
        }
      })
    }
  )
}

// COUNTS CALLS FOR THE ENTIRE DATABASE 
// DO NOT UN-COMMENT AND RUN 
//countCalls(); 

/**
 * Gets Resolved Complaints
 * @returns Map<ID, Object> of Complaints
 * */
export function getResolvedComplaints() {

  const resolved = [];

  complaintsRef.where("resolved", "==", true).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        resolved.push(thisComplaint)
      })
    }
  );

  return resolved;
}

export function toggleResolve(key, val) {
  return new Promise((resolve, reject) => {
    complaintsRef.doc(key).set({ resolved: val }, { merge: true }).then(
      function(){
        resolve(true);
      }
    ).catch(
      function() {
        reject(false);
      }
    );
  });
}

export function createComplaint(newComplaint) {
  return new Promise((resolve, reject) => {
    // noinspection JSCheckFunctionSignatures
    complaintsRef.doc().set(newComplaint).then(
      addStat(newComplaint),
      resolve()
    ).catch(
      reject()
    );
  });
}

export function addStat(thisComplaint) {
  if(thisComplaint.phone != ""){
    db.collection('phone_num_stats').doc(thisComplaint.phone).get().then(
      function(d){
        // Check if number has been used already
        if(d.exists){
          // Doc exists
          // Add to num_calls
          db.collection('phone_num_stats').doc(thisComplaint.phone).update({
            num_calls: d.data().num_calls + 1
          })
        } else {
          // Doc doesn't exist
          // Add doc
          db.collection('phone_num_stats').doc(thisComplaint.phone).set({
            num_calls: 1
          })
        }
      }
    )
  }
}

export function getPhoneNums(){

  const nums = [];
  
  db.collection('phone_num_stats').get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisNum = doc.data();
        thisNum.id = doc.id;
        nums.push(thisNum)
      })
    }
  );

  return nums;
}

export function getComplaintsByName(name) {
  const complaints = [];

  complaintsRef.where('name', '>=', name).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        complaints.push(thisComplaint);
      });
    }
  );

  return complaints;
}

export function getComplaintsByTransaction(transaction) {
  const complaints = [];

  complaintsRef.where('transaction', '==', transaction).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        complaints.push(thisComplaint);
      });
    }
  );

  return complaints;
}

export function getComplaintsByIssue(issue) {
  const complaints = [];

  complaintsRef.where('issue', '==', issue).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        complaints.push(thisComplaint);
      });
    }
  );

  return complaints;
}

export function getComplaintsByDate(date) {
  const complaints = [];

  complaintsRef.where('date', '==', date).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        complaints.push(thisComplaint);
      });
    }
  );

  return complaints;
}

export function getComplaintsByManager(addedBy) {
  const complaints = [];

  complaintsRef.where('addedBy', '==', addedBy).get().then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        const thisComplaint = doc.data();
        thisComplaint.id = doc.id;
        complaints.push(thisComplaint);
      });
    }
  );

  return complaints;
}