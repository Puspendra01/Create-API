const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const checkuserauth = require('../middleware/auth')
const ProductController = require('../controllers/ProductController')



//userController
router.get('/getalluser',checkuserauth,UserController.getalluser)
router.get('/getuserdetails',checkuserauth,UserController.getuserdetails)
router.post('/userinsert',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.post('/updatepassword',checkuserauth,UserController.updatepassword)
router.get('/logout',UserController.Logout)
router.post('/updateprofile',checkuserauth,UserController.profile_update)
router.get('/getsingleuser/:id',checkuserauth,UserController.GetsingleUser)
router.get('/deleteuser/:id',checkuserauth,UserController.DeleteUser)

//ProductController
router.post('/createproduct',ProductController.CreateProduct)
router.get('/productdisplay',ProductController.GetAllProduct)
router.get('/productdetail/:id',checkuserauth,ProductController.GetProductDetail)
router.post('/productupdate/:id',checkuserauth,ProductController.UpdateProduct)
router.get('/productdelete/:id',checkuserauth,ProductController.DeleteProduct)




module.exports = router