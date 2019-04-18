import axios from 'axios';

//Serviço generico para fazer as chamadas para api
export default {
  call(endpoint) {
    let urlApi = `http://localhost:5000/api/${endpoint}`;

    return {
      getOne: ({ id }) => axios.get(`${urlApi}/${id}`),
      getAll: () => axios.get(`${urlApi}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("usuario-spmedgroup"),
          "Content-Type": "Application/json"
        }
      }),
      update: (toUpdate) => axios.put(urlApi, toUpdate),
      create: (toCreate) => axios.put(urlApi, toCreate),
      delete: ({ id }) => axios.delete(`${urlApi}/${id}`)
    }
  }
}