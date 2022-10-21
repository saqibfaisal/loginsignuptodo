// import app from "./firbaseconfig";
// import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { getDatabase, ref, set ,onValue} from "firebase/database";
// const database = getDatabase(app)
// const auth = getAuth(app);


// let SignupUser = (object) => {
//     let { email, password, firstName, lastName } = object
//     // console.log(object,"kjfkhdkh");
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user
//                 console.log(userCredential,"USER")
//                 const refrence = ref(database, `user/${user.uid}`)
//                 set(refrence, object)
//                     .then(() => {
//                         alert("user create succefully")
//                     })
//                     .catch((error) => {
//                         alert(error)
//                     })
//             }).catch((err) => {
//                 console.log(err)
//             })
// }
// let LoginUser =(email,password)=>{
//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         const user = userCredential.user
//         // console.log(userCredential,"USER")
//         const refrence = ref(database, `user/${user.uid}`)
//         onValue(refrence,(e)=>{
//             let status = e.exists()
//             if(status){
//                 console.log(e.val());
//             }
//             else{
//                 alert("Data not found please Sign up")
//             }
//         })
//     }).catch((err) => {
//         console.log(err)
//     })
// }
// let Signout = () => {

//     return new Promise((resolve, reject) => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             resolve('user loggedout')
//         }).catch((error) => {
//             // An error happened.
//             reject(error)
//         });
//     })



// }
// export { SignupUser,LoginUser,Signout,  database  }
import app from "./firbaseconfig";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set ,onValue} from "firebase/database";




const auth = getAuth(app);
const  database  = getDatabase(app)
let signUpUser = (obj) => {
    let { email, password } = obj;
    return new Promise((resolve, reject) => {
      // === this "then" will give the status of Authentication. ===
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // user successfully registerd in authentication
          const user = userCredential.user;
          const refrence = ref(database, `users/${user.uid}`);
          set(refrence, obj)
            // === this "then" will give the status of database function
            .then(() => {
              // this "resolve" is our custom message which will show in signup page "then"
  
              // this "resolve" is our custom message which will show in signup page "then"
              resolve("User Created Successfully and send to database");
            })
            .catch((errr) => {
              reject(errr);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
}




let Signout = () => {

    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            resolve('user loggedout')
        }).catch((error) => {
            // An error happened.
            reject(error)
        });
    })



}

let LoginUser = (obj) => {
    let { email, password } = obj;
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          const reference = ref(database, `users/${user.uid}`);
          onValue(reference, (e) => {
            let status = e.exists();
            console.log(status);
            if (status) {
              resolve(e.val());
            } else {
              reject("Data Not Found :(");
            }
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          reject(errorMessage);
        });
    });
}



export { signUpUser, LoginUser, Signout,  database  }