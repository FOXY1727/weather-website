'use strict';
console.log('Client side JS is loaded!!')

//Using fetch API but is not accessible in nodejs
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const M1 = document.getElementById('message-1')
const M2 = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    M1.textContent = 'Loading...'
    M2.textContent = ' '
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                M1.textContent = data.error
            else {
                M1.textContent = data.place
                M2.textContent = data.forecast
            }
        })

    })

})