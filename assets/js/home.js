let dots = document.querySelectorAll('#dots');
let options = document.querySelectorAll('#post-options');
let closeOpt  = document.querySelectorAll('#close-opt');



for(let i =0;i<dots.length;i++)
{ 
    dots[i].style.cursor = 'pointer';
dots[i].addEventListener('click',()=>{

if(options[i].style.display == 'block')
{
    options[i].style.display = 'none';
}
else{
    options[i].style.display = 'block';
}
})
}

for(let j = 0; j < closeOpt.length; j++){
    closeOpt[j].style.cursor = 'pointer';
    closeOpt[j].addEventListener('click',()=>{
        if(options[j].style.display = 'block'){
            options[j].style.display = 'none';
        }
    })
   
}