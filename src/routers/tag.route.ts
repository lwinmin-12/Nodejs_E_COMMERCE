import { addTagHandler, dropTagHandler, getAllTagHandler, getOneTagHandler, updateTagHandler } from "../controllers/tag.controller"
import {saveImg} from "../utils/gallary"
const tagRoute = require("express").Router()


tagRoute.post("/" ,saveImg , addTagHandler)

tagRoute.get("/" , getAllTagHandler )

tagRoute.get("/:id" , getOneTagHandler)

tagRoute.post("/:id" , updateTagHandler)

tagRoute.delete("/:id" , dropTagHandler)

tagRoute.patch("/:id" , updateTagHandler)



export default tagRoute