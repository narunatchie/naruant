import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import Fb from './component/facebook'
const initUser = {name:"",lastname:"",time:""}
const NewinitUser = {name:"",lastname:""}

function App() {

  const [emaildata,setEmaildata] = useState("");
  const [user ,setUser] = useState(initUser);
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState(NewinitUser);


  


  const getUser = async () => {
    await Axios.get("http://localhost:9000/api/user").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
  };
  const addUser = (e) => {
    e.preventDefault();
    if (user.name!==""&user.lastname!=="") {
      Axios.post("http://localhost:9000/api/create", {
      name: user.name,
      lastname: user.lastname,
      email:emaildata
    })
    .then((response) => {
      setUser(initUser);
      getUser();
    });
    }
  };
  const updateUser = (id) => {
    if (newUser.name!==""&newUser.lastname!=="") {
      Axios.put(`http://localhost:9000/api/update/${id}`, {
      id:id,
      name: newUser.name,
      lastname: newUser.lastname,
    })
    .then((response) => {
      setNewUser(NewinitUser);
      getUser();
    });
  }
  };
  const deleteUser = (id) => {
    Axios.delete(`http://localhost:9000/api/delete/${id}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };


  useEffect(() => {
    getUser();
  }, []);

  return (
    
    <div className="App container">
      
      {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
        <div className="mt-5" align="center ">
        <Fb setEmaildata ={setEmaildata}/>
        </div>
      <h1 className="text-center mt-5">Welcome to React</h1>
      <div align="center"> 
      </div>
      <div className="information">
        <form action="">
          <label className="text-start form-label" htmlFor="name">
            Name:
          </label>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Frist name"
              value={user.name}
              onChange={(event) => {
                setUser({...user,name:event.target.value});
              }}
            required/>
          </div>
          <div className="mt-3">
            <label className="text-start form-label" htmlFor="name">
              Last name:
            </label>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={user.lastname}
                onChange={(event) => {
                  setUser({...user,lastname:event.target.value});
                }}
              required/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary"onClick={addUser}>
                กรอกข้อมูล
              </button>
                  <div className="">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Firstname</th>
                          <th scope="col">Lastname</th>
                          <th scope="col">time</th>
                          <th scope="col">email</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                      {userList.map((val,key) => (
                        
                        <tr key={key.toString()}>
                          <td>{key+1}</td>
                          <td>{val.firstname}</td>
                          <td>{val.lastname}</td>
                          <td>{val.time}</td>
                          <td>{val.email}</td>
                          <td>
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#exampleModal"+val.id}>เเก้ไข</button>
                            <button type="button" className="btn btn-danger" onClick={() => {deleteUser(val.id)}}>ลบ</button>

                            <div className="modal fade" id={"exampleModal"+val.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">ID:{key+1}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                      <label className="text-start form-label" htmlFor="name">
                                          Name
                                        </label>
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={newUser.name}
                                            onChange={(event) => {
                                              setNewUser({...newUser,name:event.target.value});
                                            }}
                                          required/>
                                        </div>
                                        <label className="text-start form-label" htmlFor="name">
                                          Lastname
                                        </label>
                                        <div className="mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Lastname"
                                            value={newUser.lastname}
                                            onChange={(event) => {
                                              setNewUser({...newUser,lastname:event.target.value});
                                            }}
                                          required/>
                                        </div>
                                      </div>
                                      <div className="modal-footer"> 
                                        <button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={() =>{updateUser(val.id)}}>บันทึก</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                      
                              </td>
                        </tr>
                        
                        
                      ))}
                      
                      </tbody>
                    </table>
                  </div>   
                    
            </div>
          </div>
        </form>
      </div>
    </div>




  );
}

export default App;
