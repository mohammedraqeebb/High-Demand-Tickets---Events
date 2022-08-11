import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signup = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('');


   const { doRequest, errors } = useRequest({
      url: '/api/users/signup', method: 'post', body: { email, password },
      onSuccess: () => Router.push('/')
   })


   const handleSubmit = async (event) => {
      event.preventDefault();
      await doRequest();
   }

   return <form onSubmit={handleSubmit}>
      <h1>Signup Form </h1>
      <div className="form-group">
         <label>Email address</label>
         <input value={email} type="text" className="form-control" onChange={event => setEmail(event.target.value)} />

      </div>
      <div className="form-group">
         <label>Password</label>
         <input value={password} type="password" className="form-control"
            onChange={event => setPassword(event.target.value)} />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
   </form>
}


export default Signup;