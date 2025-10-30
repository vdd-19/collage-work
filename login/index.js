const name = document.getElementById("name")  
const email = document.getElementById("email_id") 
const pass = document.getElementById("pass") 
const confirmPass = document.getElementById("con_pass") 
const btn = document.getElementById("btn") 
const logoutBtn = document.getElementById("logoutBtn")
const eye = document.querySelector(".password #eye") 


function btnClicked(event){
    event.preventDefault()  
    const username = name.value.trim()
    const userEmail = email.value
    const userPass = pass.value
    const userConfPass = confirmPass.value
    if(!username || !userEmail || !userPass || !userConfPass){
        alert("please enter valid details");
    }
    if(userPass !== userConfPass){
    console.log("incorrect password");
    alert("Passwords do not match!");
    return;
}


    const user = {
        name:username,
        email:userEmail,
        password:userPass,
        confirmPassword:userConfPass
    } 


    window.localStorage.setItem("user",JSON.stringify(user))
} 

const authUser = JSON.parse(window.localStorage.getItem("user")) 

if(authUser?.email){
    console.log("authenticated user");
    location.replace('/login.html')
    
}else{
    console.log("Unauthorized user");
    location.replace("/register.html")
} 

btn?.addEventListener("click",btnClicked)
logoutBtn?.addEventListener("click",function(){
    window.localStorage.removeItem("user")
    location.reload()
})

eye?.addEventListener("click",()=>{ 
    if(pass.getAttribute("type") === "password"){
        pass.setAttribute("type","text")
    }else{
        pass.setAttribute("type","password")
    }
})
 