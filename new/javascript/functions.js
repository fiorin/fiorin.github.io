document.addEventListener('DOMContentLoaded',function(){
    $('[data-toggle="tooltip"]').tooltip(); 
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
    $('#modal').on('show.bs.modal', function (e) {
        $(this).find('.modal-content').load(e.relatedTarget.href);
    });
})