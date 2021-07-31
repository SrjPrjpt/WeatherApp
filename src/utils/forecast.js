const request=require('request')


const forecast=(latitude,longitude,callback)=>
{
    var url='http://api.weatherstack.com/current?access_key=0f28dd061dd098b419d5390f55a8aefe&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather Service!',undefined)
        }else if(body.error){
            callback('Unable to find the location!',undefined)
        }else
        {
            callback(undefined,'it is currently '+body.current.temperature+' Degress out. it feels like '+body.current.feelslike+' Degress out!')
        }
    })
}

module.exports=forecast;