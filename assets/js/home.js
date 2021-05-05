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

// Ajax call for like and dislike posts
function toggleLike(el) {
        $.ajax({
            type: 'GET',
            url: el.attr('href')
        })
        .done((data)=>{
            let likePostId = el.attr('data-id');
            let likesCount=parseInt($('#'+likePostId).text());
            let heartSelector = $('#heart-'+likePostId);
            let heartClass = heartSelector.attr('class');
            
            if(data.data.deleted == true){
                likesCount -=1;
                heartSelector.removeClass(heartClass);
                heartSelector.addClass("far fa-heart");
                heartSelector.css('color','black');
            }else{
                likesCount +=1;
                heartSelector.removeClass(heartClass);
                heartSelector.addClass("fas fa-heart");
                heartSelector.css('color','red');
            }
            $('#'+likePostId).html(`${likesCount}`);
        })
        .fail((errData)=>{
            console.log('Error in completing the request', errData);
        });


}
$('.toggle-heart').each(function(){
    $(this).on('click',function(e){
        e.preventDefault();
        toggleLike($(this))
    })
})
