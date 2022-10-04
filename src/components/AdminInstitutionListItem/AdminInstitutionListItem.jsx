import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function AdminInstitutionListItem({ i }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const goDetail = () => {
        history.push(`/institutionViewDashboard/${i.id}`)
        dispatch({
            type: 'ACTIVE_INSTITUTION',
            payload: i
        });
    }

    return (
        <>
            <tr key={i.id} onClick={() => { goDetail(i) }}>
                <td>{i.name}</td>
                <td>{i.street_address}, {i.city}, {i.state} {i.zip}</td>
                <td></td>
            </tr>
        </>
    )
}


export default AdminInstitutionListItem;