import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react"

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export default function SignUp() {
    const [name,setName] = React.useState();
    const [passwd,setPasswd] = React.useState();
    const [email,setEmail] = React.useState();
    const [file,setFile] = React.useState();
    
    const handleChange = (event) => {
        switch (event.target.id){
            case 'name':
                setName(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'passwd':
                setPasswd(event.target.value);
                break;
            case 'file':
                setFile(event.target.files[0]);
        }
        
    }

    const handleUpload = (event) => {
        event.preventDefault();
        const storageRef = ref(storage, file.name)
        uploadBytes(storageRef, file).then(
            data => {
                console.log('File Uploaded Successfully!');
            }
        )
    }


    const handleSignUp =  (event)  =>  {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, passwd).then(
            userCredentials => {
                const user = userCredentials.user;
                console.log('User Created Successfully');
                setDoc(doc(db,'users',user.uid), {
                    displayName: name,
                    email: user.email,
                    groupId: ""
                }).then(
                    data=> {
                        console.log("User added to db successfully");
                    }
                ).catch(
                    error => console.error(error)
                );

            }
        ).catch(
            error=> console.error(error)
        )

    }
    return (
        <div style={{display:'flex', flexDirection:'column',width:'300px'}}>
            <h1>
                SignUp Page
            </h1>
            <label htmlFor='name'>Nickname</label>
            <input type={'text'} onChange={handleChange} id='name' placeholder={'JohnDoe'} required />

            <label htmlFor='email'>Email</label>
            <input type={'email'} onChange={handleChange} id='email' placeholder={'yourname@email.com'} required />

            <label htmlFor='passwd'>Password</label>
            <input type={'password'} onChange={handleChange} id='passwd' placeholder={'*********'} required />
        
            <label htmlFor='file'>file</label>
            <input type={'file'} onChange={handleChange} id='file' placeholder={'*********'} required />

            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}