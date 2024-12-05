import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image'


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
    <button disabled={loading} className="btn" onClick={handleSignIn}
    style={{
          display: 'flex',  
          alignItems: 'center', 
          gap: '5px',  
          padding: '5px 10px', 
          border: '2px solid #4285F4', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginTop:'15px',
          marginRight:'15px',
        }}>
    Continue with google <Image 
            src="/image1.png"
            alt="Google Logo" 
            width={45} 
            height={45} 
          /></button>
  </div>
)
}                              

