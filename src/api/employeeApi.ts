import axios from "axios";


const API_URL = "http://localhost:8080/api/employee";


export const getEmployees = async()=>{

    const res=await axios.get(API_URL,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        },
    });

    return res.data;



}


export const addEmployee = async(employee:any) => {
    const res = await axios.post(API_URL, employee, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return res.data;

}

export const updateEmployee = async (id: number, employee: any) => {
  const res = await axios.put(`${API_URL}/${id}`, employee, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};


export const deleteEmployee = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

