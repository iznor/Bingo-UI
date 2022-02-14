function Profile(){
    const logout = () =>{
        window.localStorage.clear();
        window.location.href = '/'
    } 
    return(
        <button onClick={logout}>
            Logout
        </button>
    )
}

export default Profile;