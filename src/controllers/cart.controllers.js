import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import cartServices from '../services/cart.services.js';
import CartDto from '../dtos/cart.dto.js';

//let admin = false;
let admin = true;

export const createCart = async (req, res, next)=>{
    try{
        const {body} = req;
        if(!admin){
            res.status(400).json({ error: -1, message: `Route ${req.baseUrl} method ${req.method} Not authorized` })
        }else if(_.isEmpty(body)){
            res.status(400).json({success: false, message: 'Name missing'})
        }else{
            Object.assign(body, {
                uuid: uuidv4(),
                products: [], 
            });
            const data = await cartServices.createCart(body);
            const dataDto = new CartDto(data);
            res.status(200).json({
                success: true,
                data: dataDto.build()
            });
        };
    }catch(err){
       next(err); 
    } 
};

export const getCarts = async (_req, res, next)=>{
    try{
        const data = await cartServices.getCarts();
        const dataDto = data.map(i => new CartDto(i))
        res.status(200).json({
            success: true,
            data: dataDto
        });
    }catch(err){
        next(err); 
    }
};

export const getCart = async (req, res, next) => {
    try{
        const {uuid} = req.params;
        const data = await cartServices.getCart(uuid);
        if(_.isNil(data)){
            res.status(400).json({
                Success: false, 
                data: 'Cart not found'
            })
        }else{
            const dataDto = new CartDto(data);
            res.status(200).json({
                succes: true,
                data: dataDto.build()
            });
        }
    }catch(err){
        next(err);
    }
};

export const deleteCart = async (req, res, next)=>{
    try{
        const {uuid} = req.params;
        const data = await cartServices.deleteCart(uuid);
        if(!admin){
            res.status(400).json({ error: -1, message: `Route ${req.baseUrl} method ${req.method} Not authorized` })
        }else if(_.isNil(data)){
            res.status(400).json({
                Success: false, 
                data: 'Cart not found'
            }) 
        }else {
            res.status(200).json({
                success: true,
                message: `Cart uuid: ${uuid} deleted`
            }); 
        }
    }catch(err){
       next(err) 
    } 
};

export const addProduct = async (req, res, next)=>{
    try{
        const {uuidCart} = req.params;
        const {uuidProduct} = req.params;
        if(!admin){
            res.status(400).json({ error: -1, message: `Route ${req.baseUrl} method ${req.method} Not authorized` })
        }else{
            const data = await cartServices.addProduct(uuidCart, uuidProduct);
            if(typeof data === 'string'){
                res.status(400).json({
                    success: false, 
                    data: data
                })
            }else{
                const dataDto = new CartDto(data);
                res.status(200).json({
                    succes: true,
                    data: dataDto.build()
                });
            }     
        }
    }catch(err){
       next(err) 
    } 
};

export const deleteProduct = async (req, res, next)=>{
    try{
        const {uuidCart} = req.params;
        const {uuidProduct} = req.params;
        if(!admin){
            res.status(400).json({ error: -1, message: `Route ${req.baseUrl} method ${req.method} Not authorized` })
        }else{
            const data = await cartServices.deleteProduct(uuidCart, uuidProduct);
            if(typeof data === 'string'){
                res.status(400).json({
                    success: false, 
                    data: data
                })
            }else {
                const dataDto = new CartDto(data);
                res.status(200).json({
                    succes: true,
                    data: dataDto.build()
                });
            }     
        }
    }catch(err){
       next(err) 
    } 
};

/* router.get('/:id/productos', async (req, res, next) => {
    try{
        const {id} = req.params;
        const data = await carritosServices.getCarritoProducts(id)
        if(!data.success){
            res.status(400).json(data)
        }else{
            res.status(200).json(data.data)
        }
    }catch(err){
        next(err);
    }
}); */