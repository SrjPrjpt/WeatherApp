const path=require('path')
const express=require('express')
const hbs=require('hbs')
const Geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port=process.env.PORT || 3000

const PublicDirectoryPath= path.join(__dirname,'../Public')
const viewspath= path.join(__dirname,'../templates/Views')
const partialspath=path.join(__dirname,'../templates/Partials')

app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(PublicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather.com',
        user:'Suraj prajapati'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        info:'This is Created for testing about!',
        user:'Suraj prajapati'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        info:'Dont expect help here!',
        user:'Suraj prajapati'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        info:'Help article Not Found!'
    })
})

app.get('/Weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:"Please Provide a address!"})
    }
    Geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error:error})
        }
        forecast(longitude , latitude , (error, forecastdata) => {
            if  (error)
            {
                return res.send({error:error})
            }
            res.send({location,forecastdata, address:req.query.address})
        })
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        info:'Page Not Found!'
    })
})

app.listen(port,()=>{
    console.log('Server is listening to port: '+port)
})