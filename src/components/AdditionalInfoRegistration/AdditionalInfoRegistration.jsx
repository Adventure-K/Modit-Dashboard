import { useSelector } from 'react-redux'
import './AdditionalInfoRegistration.css'
function AdditionalInfoRegistration () {
    const credentials = useSelector((store) => store.user.registrationReducer)
    console.log(credentials);

    return (
        <h1 className='centeredHeaders'>Additional Info</h1>
    )
}

export default AdditionalInfoRegistration