'use strict';

console.log('Client side JS is loaded!!')

//Using fetch API but is not accessible in nodejs


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('message-1').textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) return document.getElementById('message-1').textContent = data.error
            console.log(data.place)
            console.log(data.weather[0])
            document.getElementById('message-1').textContent = data.place
            document.getElementById('message-2').textContent = data.weather[0]
        })

    })

})