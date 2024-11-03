const API = "https://67237c71493fac3cf24b0d97.mockapi.io/user";

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernamePost = document.getElementById('username-logup');
const passwordPost = document.getElementById('password-logup');
const rePasswordPost = document.getElementById('re-password');
const togglePassword = document.getElementById('togglePassword');
const btnLogin = document.getElementById('login')
const btnLogUp = document.getElementById('logup')
const btnLogin1 = document.getElementById('login1')
const btnLogUp1 = document.getElementById('logup1')

function togglePasswordVisibility(){
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        togglePassword.textContent ="Ẩn";
    }
    else{
        passwordInput.type ="password";
        togglePassword.textContent="Hiện";
    }
}

btnLogUp.addEventListener("click", function(){
    document.getElementById("login-form-container").style.display="none";
    document.getElementById("logup-form-container").style.display="block";
})
btnLogin1.addEventListener("click",function(){
    document.getElementById("logup-form-container").style.display="none";
    document.getElementById("login-form-container").style.display="block";
})
btnLogin. addEventListener('click',function(){
    user.login();
})
btnLogUp1. addEventListener('click',function(){
    user.register();
})


const api ={
    get: async ()=>{
        return fetch(API).then(e=>e.json());
    },
    create:async (data)=>{
        return fetch(API,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(e=>e.json());
    },
    update: async (data,id)=>{
        return fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(e=>e.json());
    },
    delete: async (id)=>{
        return fetch(`${API}/${id}`, {
            method: "DELETE",
        }).then(e=>e.json());
    }
}

const user ={
    login: async function () {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const data = await api.get();
        console.log(data)
        if(await checkText(username,password)){
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (username == data[i].username && password == data[i].password) {
                    flag = true;
                    if(data[i].isFlag == false){
                        console.log("đăng nhập thành công")
                        window.location.href="../home.html";
                    }
                    else {
                        console.log("Tài khoản của bạn đã bị khoá, Vui lòng liên hệ admin");
                    }
                    break;
                }
            }
            if(!flag){
                console.log("đăng nhập không thành công")
            }
        }
        
    },
    register: async function (){
        const username = usernamePost.value;
        const password = passwordPost.value;
        const rePassword = rePasswordPost.value;
        if(await checkTextLogup(username,password,rePassword)){
            console.log(checkTextLogup(username,password,rePassword))
            let data = {
                username : usernamePost.value,
                password : passwordPost.value
            }
            api.create(data).then(console.log);
        }
        else {
            console.log("Đăng ký không thành công")
        }
    }

}

async function checkText(username,password){
    let isCheck = true;

    if(username==""){
        errors(usernameInput,"Tài khoản không được để trống")
    } 
    else success(usernameInput)
    if(password==""){
        errors(passwordInput,"Mật khẩu không được để trống")
        isCheck = false;
    }
    else success(passwordInput)
    return isCheck;
}

async function checkTextLogup(username,password,rePassword){
    let isCheck = true;
    if(username==""){
        errors(usernamePost,"Tài khoản không được để trống")
        isCheck = false;
    } 
    else success(usernamePost)
    if(password==""){
        errors(passwordPost,"Mật khẩu không được để trống")
        isCheck = false;
    } 
    else success(passwordPost)
    if(rePassword==""){
        errors(rePasswordPost,"Nhập lại mật khẩu không được để trống")
        isCheck = false;
    } 
    else{
        success(rePasswordPost);
        if(rePassword != password ){
            errors(rePasswordPost,"Mật khẩu không giống nhau");
            isCheck = false;
        }
        else success(rePasswordPost)
    }
    
    return isCheck;
}

function errors(element, messenger){
    let parenElement = element.parentNode;
    console.log(parenElement)
    parenElement.classList.remove('success')
    parenElement.classList.add('error')
    parenElement.querySelector('small').innerText=messenger;
}

function success(element){
    let parenElement = element.parentNode;
    parenElement.classList.remove('error')
    parenElement.classList.add('success')
    parenElement.querySelector('small').innerText=""
}


