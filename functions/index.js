const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp();

/**
 * Update expiration dates for all complaints
 * Runs every day at 4am
 * @type {CloudFunction<unknown>}
 */
/*exports.updateExpirationDates = functions.pubsub.schedule('0 4 * * *').timeZone('America/New_York').onRun(async (context) => {
  const snapshot = await admin.firestore().collection('complaints').get();
  snapshot.forEach(doc => {
    let days = moment().diff(moment(moment.unix(doc.date).format('MM/DD/YYYY')), 'days');
    if(days > 30) doc.update({expired: true});
    //if(days > 90) doc.delete();
  });
});
*/

// Listen for any change on document `marie` in collection `users`
exports.checkExpiration = functions.firestore
  .document('complaints/{complaintID}').onWrite((change, context) => {
    db.collection("complaints").get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
  
          // Try to find number in Stats
          if(doc.data().date < (Date.now() - 25920000)){
            console.log("Expired: " + doc.data().name);
            doc.data().expired = true;
            doc.data().resolved = true;
          }
        })
      }
    )
});