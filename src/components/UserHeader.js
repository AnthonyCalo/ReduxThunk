import React from 'react';
import {connect} from 'react-redux';



class UserHeader extends React.Component {
    
   

    render(){
        const user = this.props.user;
        if(!user){
            return null;
        }else{
            return <div className="header">{user.name}</div>
        }
    }
    
}
const mapStateToProps=(state, ownProps)=>{
    //ownprops allows access to props outside of react component

    return {user: state.users.find(user=> user.id===ownProps.userid)};
};

export default connect(mapStateToProps)(UserHeader);




