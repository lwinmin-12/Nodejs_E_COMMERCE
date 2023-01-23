import {object, string} from "yup"

 export const permitSchema = object({
    body : object({
        name : string().required('name is required')
    })
 }) 
 export const allSchema = object({
    params : object({
        id : string().matches(/^[0-9a-fA-F]{24}$/ , "invlid id")
    })
 })

 export const roleAddPermitSchema = object({
    body: object({
        roleId: string().matches(/^[0-9a-fA-F]{24}$/ , "invlid id"),
        permitId : string().matches(/^[0-9a-fA-F]{24}$/ , "invlid id")
    })
 })

 

