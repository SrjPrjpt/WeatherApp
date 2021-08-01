const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#msg1')
const msgtwo=document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    msgone.textContent='Loading...'
    msgtwo.textContent=''

    fetch('/Weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            msgone.textContent=data.location
            msgtwo.textContent=data.forecastdata
        }
        else{
            msgone.textContent=data.error
        }
    })
})
})