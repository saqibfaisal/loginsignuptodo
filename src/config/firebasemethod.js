import app from "./firbaseconfig";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set ,onValue} from "firebase/database";
const database = getDatabase(app)
const auth = getAuth(app);


let SignupUser = (object) => {
    let { email, password, firstName, lastName } = object
    // console.log(object,"kjfkhdkh");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(userCredential,"USER")
                const refrence = ref(database, `user/${user.uid}`)
                set(refrence, object)
                    .then(() => {
                        alert("user create succefully")
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }).catch((err) => {
                console.log(err)
            })
}
let LoginUser =(email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        // console.log(userCredential,"USER")
        const refrence = ref(database, `user/${user.uid}`)
        onValue(refrence,(e)=>{
            let status = e.exists()
            if(status){
                console.log(e.val());
            }
            else{
                alert("Data not found please Sign up")
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}
export { SignupUser,LoginUser }