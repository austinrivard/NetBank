import React,{useState} from "react"
export const RegisterFrom = (props) => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className ="register-form"onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value = {name} name ="name" id="name" placeholder="full name"/>
            <label htmlFor="email">email</label>
            <input value ={email} onChange={(e) => setEmail(e.target.value)} type="email"placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input value ={password}onChange={(e) => setPassword(e.target.value)}type="password"placeholder="********" id="password" name="password"/>
            <div className="checking-btn">
                <button type="checkings" className="checkings">Checkings?</button>
            </div>
            <div className="saving-btn">
                <button type="saving" className="savings">Savings?   </button>
            </div>
            <button type="submit">Log In</button>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Returning User? Login Here.</button>
        </form>
    </div> 
    )
}