import { useHistory } from 'react-router-dom';
import fb from '../fb'

function Logout(){
    const history = useHistory()

    const logout = async()=>{
        await fb.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
          history.push("/")
    }
    logout()
    return null;
}
export default Logout;