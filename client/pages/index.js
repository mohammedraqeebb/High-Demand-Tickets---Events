import buildClient from "../api/build-client"

const App = ({ currentUser }) => {

   if (currentUser === null)
      return <h1> you are not logged in </h1>

   return <h1>you are logged in as : {currentUser.email}</h1>
}

App.getInitialProps = async (context) => {
   const client = buildClient(context);

   const { data } = await client.get('/api/users/currentuser');
   return data;
}

export default App;