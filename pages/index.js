import Head from 'next/head'
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from './signUp';

const auth = getAuth();

export default function Home() {
  
  const [email, setEmail] = React.useState(null);
  const [passwd, setPasswd] = React.useState(null);
  
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
    if(event.target.id == 'email'){
      setEmail(event.target.value);
    }else{
      setPasswd(event.target.value);
    }
    console.log(`Email: ${email} password:${passwd}`);
  }

  
  const handleSignIn = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth,email,passwd).then(
      (userCredentials) => {
        const user = userCredentials.user;
        console.log('User create successfully ' + user);
      }
    ).catch(
      (e) => {
        console.error(e);
      }
    )
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <div className='sign-in'>
          <h1>Sign in</h1>
          <label htmlFor='email'>Email</label>
          <input type={'email'} onChange={handleChange}  id='email' placeholder={'yourname@email.com'} required />
          <label htmlFor='passwd'>Password</label>
          <input type={'password'} onChange={handleChange} id='passwd' placeholder={'࡞࡞࡞࡞࡞࡞࡞'} required />  
          <button onClick={handleSignIn}>Sign In</button>
        </div> */}
        <SignUp />
      </main>
    </>
  )
}
