import productService from '../services/product.services.js';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import ProductDto from '../dtos/product.dto.js';

//let admin = false;
let admin = true;

 export const createProduct =  async (req, res, next)=>{
    try{
        const {body} = req;
        if(!admin){
            res.status(400).json({ error: -1, message: `route ${req.baseUrl} method ${req.method} Not authorized` })
        }else if(_.isEmpty(body)){
            res.status(400).json({success: false, message: 'Body data missing'})
        }else if (_.isNil(body.name) || _.isNil(body.description) || _.isNil(body.image) || _.isNil(body.price) || _.isNil(body.stock)){
            res.status(400).json({success: false, message: 'Product atributte missing'})
        } else {
            Object.assign(body, {
                uuid: uuidv4()
            });
            const data = await productService.createProduct(body);
            const dataDto = new ProductDto(data);
            res.status(200).json({
                success: true,
                data: dataDto.build()
            });
        }
    }catch(err){
       next(err) 
    } 
};

export const getProducts = async (_req, res, next)=>{
    try{
        const data = await productService.getProducts();
        const dataDto = data.map(i => new ProductDto(i))
        res.status(200).json({
            success: true,
            data: dataDto
        });
    }catch(err){
        next(err); 
    }
};

export const getProduct = async (req, res, next) => {
    try{
        const {uuid} = req.params;
        const data = await productService.getProduct(uuid);
        if(_.isNil(data)){
            res.status(400).json({
                Success: false, 
                data: 'Product not found'
            });
        }else {
            const dataDto = new ProductDto(data);
            res.status(200).json({
                success: true,
                data: dataDto.build()
            });
        }
    }catch(err){
        next(err);
    }
};

export const updateProduct = async(req, res, next) => {
    try{
        const {uuid} = req.params;
        const {body} = req;
        if(!admin){
            res.status(400).json({ error: -1, message: `route ${req.baseUrl} method ${req.method} Not authorized` })
        }else if(_.isEmpty(body)){
            res.status(400).json({success: false, message: "Body data missing"})
        }else if(_.isNil(body.name) || _.isNil(body.description) || _.isNil(body.image) || _.isNil(body.price) || _.isNil(body.stock)){
            res.status(400).json({success: false, message: 'Product atributte missing'})
        }else{
            const data = await productService.updateProduct(uuid, body);
            if(_.isNil(data)){
                res.status(400).json({
                    Success: false, 
                    data: 'Product not found'
                })
            }else {
                const dataDto = new ProductDto(data);
                res.status(200).json({
                    succes: true,
                    data: dataDto.build()
                }); 
            }
        }
    }catch(err){
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try{
        const {uuid} = req.params;
        const data = await productService.deleteProduct(uuid);
        if(!admin){
            res.status(400).json({ error: -1, message: `route ${req.baseUrl} method ${req.method} Not authorized` })
        } else if(_.isNil(data)){
            res.status(400).json({
                Success: false, 
                data: 'Product not found'
            });
        }else {
            res.status(200).json({
                success: true,
                data: `Product uuid: ${uuid} deleted`
            });
        }
    }catch(err){
        next(err);
    }
};