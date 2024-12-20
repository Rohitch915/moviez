import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { jwtVerification } from "./middlewares/jwtVerification.js";
const app = express()

//General Middlewares  CJUSC
app.use(cors({ //CORS - Cross Origin Resource Sharing
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"500kb"})) //to parse the req.body into json format 
app.use(express.urlencoded({limit:"500kb",extended:true}))  //urlencoded() is a method  to recognize the incoming Request Object as strings or arrays
app.use(express.static('public')) //to load the html files in public folder
app.use(cookieParser()) //to enable cookie operations like setCookie and clearCookie 


import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", jwtVerification, movieRoutes);
app.use("/api/v1/tv", jwtVerification, tvRoutes);
app.use("/api/v1/search", jwtVerification, searchRoutes);