const sendData = (path, data) => {
    console.log(data);
    fetch(path, {
    method: 'post',
    headers: new Headers({        'Content-Type': 'application/json',}),
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => processData(data));
    }

const processData = (data) => {
   
    loader.style.display=null;
    
    }
     


const showFormError = (err) => {
    let errorEle = document.querySelector('.error');
    errorEle.innerHTML = err;
    errorEle.classList.add('show')
}