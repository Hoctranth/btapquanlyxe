const APIUser = "https://67237c71493fac3cf24b0d97.mockapi.io/user";
const APIVehicles = "https://67237c71493fac3cf24b0d97.mockapi.io/vehicles";
const userTable = document.getElementById("user-table")
const vehiclesTable = document.getElementById("vehicle-table")
const vehiclesSection = document.getElementById("vehicle-management")
const userSection = document.getElementById("user-management")
const userLi = document.getElementById("user-li")
const vehicleLi = document.getElementById("vehicle-li")

const callAPI = {
    getUser: async () => {
        return fetch(APIUser).then(e => e.json());
    },
    getUserId: async (id) => {
        return fetch(`${APIUser}/${id}`).then(e => e.json());
    },
    createUser: async (data) => {
        return fetch(APIUser, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(e => e.json());
    },
    updateUser: async (data, id) => {
        return fetch(`${APIUser}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(e => e.json());
    },
    deleteUser: async (id) => {
        return fetch(`${APIUser}/${id}`, {
            method: "DELETE",
        }).then(e => e.json());
    },
    // API Vehicles
    getVehicles: async () => {
        return fetch(APIVehicles).then(e => e.json());
    },
    getVehiclesID: async (id) => {
        return fetch(`${APIVehicles}/${id}`).then(e => e.json());
    },
    createVehicles: async (data) => {
        return fetch(APIVehicles, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(e => e.json());
    },
    updateVehicles: async (data, id) => {
        return fetch(`${APIVehicles}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(e => e.json());
    },
    deleteVehicles: async (id) => {
        return fetch(`${APIVehicles}/${id}`, {
            method: "DELETE",
        }).then(e => e.json());
    }
}
function showSection(sectionID) {
    if (sectionID === "user-management") {
        userSection.style.display = "block";
        vehiclesSection.style.display = "none";
        userLi.classList.add('active');
        vehicleLi.classList.remove('active');
    }
    else if (sectionID === "vehicle-management") {
        vehiclesSection.style.display = "block";
        userSection.style.display = "none";
        vehicleLi.classList.add('active');
        userLi.classList.remove('active');
    }
}
userLi.addEventListener("click", function () {
    showSection("user-management");
    render.renderUser()
});
vehicleLi.addEventListener("click", function () {
    showSection("vehicle-management");
    render.renderVehicles()
});

const render = {
    renderUser: async function () {
        const data = await callAPI.getUser();
        let table = `<table>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Tên User
                        </th>
                        <th>
                            Tài khoản
                        </th>
                        <th>
                            Chức năng
                        </th>
                    </tr>`

        for (const element of data) {
            table += `<tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.username}</td>
            <td>
                <button class="btn button-lock" id="lock-${element.id}">Đang tải...</button>
                <button class="btn button-password" id="repass-${element.id}" onclick ="loadUser(${element.id})">Đổi Mật Khẩu</button>
                <div id="openRepass-${element.id}" class="input-group formRepass">
                    <div>
                        <label for="rePass">Mật khẩu mới</label>
                        <input type="text" placeholder=" Vui lòng nhập mật khẩu mới" name="rePass" id="newPass">
                    <div>
                    <div>
                        <button type="button" id="sumit-repass" onclick="updatePass()">Đồng Ý</button>
                        <button type="button" class="btn-cancel" id="exit" onclick ="closeForm(${element.id},'openRepass-')">Thoát</button>
                    </div>
                </div>
            </td>
        </tr>`
        };
        table += `</table>`
        userTable.innerHTML = table;
        for (const element of data) {
            const btn = document.getElementById(`lock-${element.id}`)
            await getLockAndOpen(element.id)

            btn.addEventListener('click', function () {
                updateIsFlag(element.id)
            })
        }
    },

    renderVehicles: async function () {
        const data = await callAPI.getVehicles();
        let table = `<table>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Tên Chủ Xe
                        </th>
                        <th>
                            Biển số xe
                        </th>
                        <th>
                            Hãng Xe
                        </th>
                        <th>
                            Màu Xe
                        </th>
                        <th>
                            Chức năng
                        </th>
                    </tr>`
        data.forEach(element => {
            table += `<tr>
                    <td>${element.id}</td>
                    <td>${element.tenchuxe}</td>
                    <td>${element.bienso}</td>
                    <td>${element.hangxe}</td>
                    <td>${element.mausac}</td>
                    <td>
                        <button class="btn button-update" id=""onclick ="loadVehiclesUpdate(${element.id})">Sửa</button>
                        <button class="btn btn-cancel" id="" onclick ="loadVehiclesDelete(${element.id})">Xoá</button>
                        <div id="form-update-${element.id}" class="form">
                            <h2>Update Thông Tin Xe</h2>
                            <div>
                                <label for="namechuxe">
                                    Nhập tên chủ xe
                                </label>
                                <input type="text" name="namechuxe" id="namechuxe-${element.id}">
                            </div>
                            <div>
                                <label for="bienso">
                                    Nhập biển số
                                </label>
                                <input type="text" name="bienso" id="bienso-${element.id}">
                            </div>
                            <div>
                                <label for="hangxe">
                                    Nhập hãng xe
                                </label>
                                <input type="text" name="hangxe" id="hangxe-${element.id}">
                            </div>
                            <div>
                                <label for="mausac">
                                    Nhập màu sắc
                                </label>
                                <input type="text" name="mausac" id="mausac-${element.id}">
                            </div>
                            <div>
                                <button type="button" id="button-update" onclick = "updateVehicles()">Xác Nhận</button>
                                <button type="button" class="button-canel" onclick = "closeForm(${element.id}, 'form-update-')">Từ chối</button>
                            </div>
                        </div>
                        <div id="form-delete-${element.id}" class="form">
                            <h2>Xoá Thông Tin Xe</h2>
                            <p> 
                                Bạn có chắc chắn muốn xoá thông tin xe này chứ?
                            </p>
                            <div>
                                <button type="button" id="button-delete" onclick = "deleteVehicles()">Xác Nhận</button>
                                <button type="button" class="button-canel" onclick = "closeForm(${element.id},'form-delete-')">Từ chối</button>
                            </div>
                        </div>
                    </td>
                </tr>`
        });
        table += `</table>`
        vehiclesTable.innerHTML = table;
    }
}

showSection('user-management');
render.renderUser()

var selectID = null;
var selectForm = null

// xử lý get lock và không lock
async function getLockAndOpen(id) {
    const data = await callAPI.getUserId(id);
    const btn = document.getElementById(`lock-${id}`)
    if (data.isFlag == true) {
        btn.innerText = "Mở khoá";
        btn.classList.add("lock");
    }
    else {
        btn.innerText = "Khoá";
        btn.classList.remove("lock");
    }
}

async function updateIsFlag(id) {
    const data = await callAPI.getUserId(id);
    const newFlag = !data.isFlag;
    const btn = document.getElementById(`lock-${id}`)
    const updateFlag = await callAPI.updateUser({ isFlag: newFlag }, id)
    btn.innerText = updateFlag.isFlag ? "Mở khoá" : "Khoá";
    getLockAndOpen(id);
}


// user
function loadUser(id){
    var userId = `openRepass-`
    openForm(id,userId);
    selectID=id;
}

async function updatePass() {
    const data = await callAPI.getUserId(selectID);
    var newPass = document.getElementById("newPass").value;
    if(data.id == selectID){
        await callAPI.updateUser({password: newPass},selectID)
        console.log("đã đổi mất khẩu thành công")
    }
    selectID=null;
    render.renderUser();
}

//Vehicles
function loadVehiclesUpdate(id){
    var vehiclesId = `form-update-`
    openForm(id,vehiclesId);
    selectID=id;
}

async function updateVehicles(){
    const data = await callAPI.getVehiclesID(selectID);
    var newNameChuXe = document.getElementById(`namechuxe-${selectID}`).value;
    var newBienSo = document.getElementById(`bienso-${selectID}`).value;
    var newHangXe = document.getElementById(`hangxe-${selectID}`).value;
    var newMauSac = document.getElementById(`mausac-${selectID}`).value;
    if(data.id == selectID){
        await callAPI.updateVehicles({
            tenchuxe:newNameChuXe,
            bienso : newBienSo,
            hangxe : newHangXe,
            mausac : newMauSac
        },selectID)
        console.log("đã update thành công")
    }
    selectID=null;
    render.renderVehicles();
}

function loadVehiclesDelete(id){
    var vehiclesId = `form-delete-`
    openForm(id,vehiclesId);
    selectID=id;
}
async function deleteVehicles(){
    const data = await callAPI.getVehiclesID(selectID);
    if(data.id == selectID){
        await callAPI.deleteVehicles(selectID)
        console.log("đã xoá thành công")
    }
    selectID=null;
    render.renderVehicles();
}

function openForm(id,pre){
    if(selectID != null){
        closeForm(selectID,pre);
    }
    document.getElementById(pre + id).style.display = "block"
}
function closeForm(id, pre){
    document.getElementById(pre + id).style.display = "none";
}

