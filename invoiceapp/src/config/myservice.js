import axios from 'axios'
import { INVOICE_URL } from './url'
export function AddUser(data){
    return axios.post(`${INVOICE_URL}user/adduser`,data,{ headers: {'content-type': 'multipart/form-data'}})
}
export function UserLogin(data){
    return axios.post(`${INVOICE_URL}user/loginuser`,data)
}
export function GetInvoice(data){
    return axios.post(`${INVOICE_URL}invoice/getuser`,data)
}
export function AddingInvoice(data){
    return axios.post(`${INVOICE_URL}invoice/addinvoice`,data)
}
export function ChangeStatus(data){
    return ( console.log(data) ,axios.post(`${INVOICE_URL}invoice/changeStatus`,data))
}
export function getlogo(data){
    return ( console.log(data) ,axios.post(`${INVOICE_URL}user/getlogo`,data))
}
export function UpdateCompany(data){
    return ( console.log(data) ,axios.post(`${INVOICE_URL}user/updatecompany`,data,{ headers: {'content-type': 'multipart/form-data'}}))
}