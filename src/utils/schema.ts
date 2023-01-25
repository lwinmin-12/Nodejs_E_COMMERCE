import {object, string } from "yup"

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

 
 export const userRegisterSchema = object({
    body : object({
        name : string().min(5).required('name required'),
        email : string().email('email need to be valid').required(),
        phone : string().min(7).max(12).required('phone required'),
        password : string().min(4).required('password required')
    })
 })

 export const userLoginSchema = object({
    body : object({
        phone : string().min(7).max(12).required('phone required'),
        password : string().min(4).required('password required')
    })
 })

 export const userAddRoleSchema = object({
    body : object({
        userId : string().matches(/^[0-9a-fA-F]{24}$/ ),
        roleId : string().matches(/^[0-9a-fA-F]{24}$/ )
    })
 })

 export const userAddPermitSchema = object({
    body : object({
        userId : string().matches(/^[0-9a-fA-F]{24}$/ ),
        permitId : string().matches(/^[0-9a-fA-F]{24}$/ ),
    })
 })