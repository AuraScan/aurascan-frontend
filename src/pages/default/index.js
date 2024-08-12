import { connect } from 'react-redux'
import InfoList from './detail'
import { setPublicAddress } from '../../store/rootReducer'

const mapStateToProps = (state) => {
    return {
        publicAddress: state.publicAddress,
        init_address: state.init_address,
        // petData: state.petData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPublicAddress: (publicAddress) => dispatch(setPublicAddress(publicAddress)),
        // setpetData:(petData)=>dispatch(setpetData(petData))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(InfoList)



