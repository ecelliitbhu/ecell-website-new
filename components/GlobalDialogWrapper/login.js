import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';



export default function Login (){
  const [loading,setLoading]=useState(false)
const handleSignIn = async () => {
  try {
    setLoading(true)
    const result = await signIn();
    
    
    if (result?.error) {
      setLoading(false)
      alert('Please fill the campus ambassador form first');
      router.push('/campus-ambassador-form');
    }
  } catch (error) {
    setLoading(false)
    console.error('Sign in error:', error);
    alert('An error occurred during sign in');
  }
};
return (
    <div>
    <button disabled={loading} className="btn" onClick={handleSignIn}>Continue with google</button>
  </div>
)
}