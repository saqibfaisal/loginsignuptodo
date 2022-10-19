import app from "./firbaseconfig";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase(app)
const auth = getAuth(app);


let SignupUser = (object) => {
    let { email, password, firstName, lastName } = object
    console.log(object,"kjfkhdkh");
    // return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(userCredential,"USER")
                const refrence = ref(database, `user/${user.uid}`)
                set(refrence, object)
                    .then(() => {
                        alert("user create succefully")
                        // console.log(succ)
                        // alert(succ)
                    })
                    .catch((error) => {
                        // reject(error)
                        alert()
                        // console.log(error)
                    })
                // console.log(user);
            }).catch((err) => {
                // reject(err)
                console.log(err)
            })
    // })
}
let LoginUser =(email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        console.log(userCredential,"USER")
        const refrence = ref(database, `user/${user.uid}`)
        set(refrence, user)
            .then(() => {
                // resolve("user create succefully")
                alert("succ")
            })
            .catch((error) => {
                // reject(error)
                alert(error)
            })
        // console.log(user);
    }).catch((err) => {
        // reject(err)
        console.log(err)
    })
}
export { SignupUser,LoginUser }