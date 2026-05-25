import {test,expect} from '@playwright/test'
import { request } from 'node:http'
import {apiKeyQuery1} from '../utils/apikey'
import * as fs from 'fs';


//valid
test('API with valid values for authz', async({request})=>{

const url='https://api.openweathermap.org/data/2.5/weather'
const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    }
    const newurl=apiKeyQuery1(`${url}`,{extraParams:{lat:'44.34',lon:'10.99'}})

const response=await request.get(newurl,{headers:headers })
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
const resdata=await response.json()
console.log(resdata)
})




//invalid
test('API with invalid values for authz', async({request})=>{

const url='https://api.openweathermap.org/data/2.5/weather'
const queryparams= {
lat:44.34,
lon:10.99,
appid:'08d6740a3683e5074e12a001e47021fg'
}

const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    }
const response=await request.get(url,{params:queryparams, headers:headers })
expect(response.status(),'Should be invalid credentials').toBe(401)
})

//missing of mandatory parameters
//missing longitude values -lon is empty
test.skip('API with missing mandate values with valid authz', async({request})=>{

const url='https://api.openweathermap.org/data/2.5/weather'

const queryparams= {
lat:44.34,
lon:10.99,
appid:'08d6740a3683e5074e12a001e47021fg'
}

const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    }
const response=await request.get(url,{params:queryparams, headers:headers })
expect(response.status(),'Should be invalid credentials').toBe(200)
})