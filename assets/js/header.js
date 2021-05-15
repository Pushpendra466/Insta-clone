
let searchUser = document.querySelector('#searchUser');
searchUser.addEventListener('submit',(event)=>{
    let searchBox = document.querySelector('#searchInput').value
    event.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/users/search',
        data: {searchBox}
    })
    .done((data)=>{
        $('#search-results').empty();
        $('#search-results').css('display','block');
        for(user of data.users){
            $('#search-results')
            .append(`<li><a href=/users/profile/${user._id}>
            <img src=${user.avatar} class='profile-pic'></a>&emsp;<a href=/users/profile/${user._id}>${user.name}</a>
            </li>`); 
        }
        document.addEventListener('click',(e)=>{
            $('#search-results').css('display','none');
        })
       
    })
    
})