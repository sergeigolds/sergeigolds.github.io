$(document).ready(function(){

  // MODAL
  var modalText = {
    aerin: {
      title: 'Aerin Group',
      detail: 'Aerin Group is a professional company specializing in developing, manufacturing and exporting air suspension parts, such as air spring, air shock absorber, air compressor, power steering pump and turbocharger.',
      link: 'https://aeringroup.com'
    },
    igda: {
      title: 'IGDA Estonia',
      detail: 'IGDA Estonia is the local Estonian chapter of the IGDA. Our mission is to develop Estonian gaming scene and unite together individuals and companies of our game industry.',
      link: 'http://www.igdaestonia.org'
    },
    optima: {
      title: 'Optima Real Estate',
      detail: 'We are oriented to the Estonian Real Estate market; we have experience of cooperation with different clients and offer many additional services. We successfully advise on all real estate matters, take a personal approach and always stand up for our client’s rights.',
      link: 'https://optimare.ee'
    },
    cantra: {
      title: 'Cantra',
      detail: 'Cantra is the only OEM leather supplier with a 1,000+ color collection of real OEM leathers, fabrics, and materials.',
      link: 'https://cantra-minsk.by'
    },
    denta: {
      title: 'Denta Dios',
      detail: 'Denta Dios Dental Care will help you make progress towards a charming smile.',
      link: 'https://dentadios.ee'
    },
    crafta: {
      title: 'Anna Crafta',
      detail: 'Anna Crafta Handmade a shop of handmade gifts.',
      link: 'https://crafta.eu'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
