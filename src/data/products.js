import imagesArray from './images'
import axios from 'axios'


import Spinach from '../assests/Images/Spinach.jpg'
import Carrot from '../assests/Images/Carrot.jpg'
import Bread from '../assests/Images/Bread.jpg'
import Butter from '../assests/Images/Butter.jpg'
import Cheese from '../assests/Images/Cheese.jpg'

const products_array = []
let imgx = null
axios.get('http://localhost:4000/api/products').then((res) => {
    for ( let key in res.data) {
        if( imagesArray[key].name === res.data[key].name) {
            imgx = imagesArray[key].img 
        }
        products_array.push({
            name: res.data[key].name,
            price: res.data[key].price,
            stock: res.data[key].stock,
            InStock: res.data[key].InStock,
            category: res.data[key].category,
            image: imgx
        })
    }
}).catch((e) => {
    console.log(e)
})

console.log(products_array)

const products = [{
    "name" : "Spinach",
    "price" : 3,
    "InStock" : true,
    "stock" : 30,
    "category" : "veg",
    "image" :Spinach
}, {
"name" : "Carrot",
"price" : 2,
"InStock" : false,
"stock" : 30,
"category" : "veg",
"image" : Carrot
}, {
    "name" : "Bread",
    "price" : 5,
    "InStock" : true,
    "stock" : 20,
    "category" : "dairy",
    "image" : Bread
},{
    "name" : "Butter",
    "price" : 7,
    "InStock" : true,
    "stock" : 15,
    "category" : "dairy",
    "image" : Butter
}, {
    "name" : "Cheese",
    "price" : 5,
    "InStock" : true,
    "stock" : 30,
    "category" : "dairy",
    "image" : Cheese
}]

console.log(products)

export default products_array