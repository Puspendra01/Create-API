const ProductModel = require('../models/Product')
const bcrypt = require('bcrypt')
const cloudinary = require("cloudinary").v2;
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: 'dsnbuq6as',
    api_key: '418239745438181',
    api_secret: 'IjQ6X-KTMTq5YQETNTH1ljB2KU0',
    secure: true
})

class ProductController {

    static CreateProduct = async (req, res) => {
        try {
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'productimage',
            })
            const result = new ProductModel({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                numOfReviews: req.body.numOfReviews,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url,
                },
            })
            //saving data
            await result.save()
            res.status(201).send({
                status: 'success',
                message: 'Product Created Successfully 😃🍻',
                result,
            })
        } catch (err) {
            console.log(err)
        }
    }
    static GetAllProduct = async (req, res) => {
        try {
            const data = await ProductModel.find()
            res.status(201).json({
                status: 'success',
                message: 'successful',
                data,
            })
        } catch (error) {
            console.log(error)
        }
    }
    static GetProductDetail = async (req, res) => {
        try {
            //  const { id, name, description } = req.data2
            const data = await ProductModel.findById(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'successful',
                data,
            })
        } catch (error) {
            console.log(error)
        }
    }
    static UpdateProduct = async (req, res) => {
        try {            
              const update = await ProductModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                numOfReviews: req.body.numOfReviews,
                // image: {
                //     public_id: myimage.public_id,
                //     url: myimage.secure_url,
                //  },
            })
            await update.save()
          res.status(201).send({
            status: 'success',
            message: 'Product  Successfully 😃🍻',
            update,
          })
        }
        catch (error) {
            console.log(error)
        }  
    }
    static DeleteProduct = async (req, res) => {
        try {
            const userDelete = await ProductModel.findById(req.params.id)
            if (!userDelete) {
                return res
                    .status(500)
                    .json({ status: '500', message: 'product not !! found  😪  ' })
            }
            // To delete the data from database
            await ProductModel.deleteOne(userDelete)
            res.status(200).json({
                status: 'deleted successfully',
                message: '  Successfully product deleted 🥂🍻',
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductController