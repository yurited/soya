
// click individual project to subPage
function clickSubPage() {
    $("#work a").click(function(evt) {
        evt.preventDefault();
        var index = $('#work a').index(this);
        var uri = $('#work a').eq(index).attr('href');
        // some magic for uri update
        // window.history.replaceState(null, null, uri);

        // hide work and display subPage element
        $('#work').hide();
        $('#subPage .project').eq(index).addClass('active_project');
        //var displayId = $('#subPage .project').eq(index).data('url');
        //$('#' + displayId).siblings().hide();

        // delete old location hash and append new one
        // var newURLString = window.location.href + '#' + displayId;
        // window.location.href = newURLString;

        // hide intro__control and display nav__control
        // $('.intro__control').hide();
        // $('.nav__control').show();

        // add class intro__clickable to header
        // $('.intro__title').addClass('intro__clickable');
        $('.intro').hide();
        $('.subPageHeader').show();
    });
}

function clickWorkButton() {
    $('.intro__control #workButton').click(function() {
        if (!$(this).hasClass('menu_selected')) {
            $('.intro__title').removeClass('intro__clickable');
            // $('#subPage .project').hide();
            // history.pushState(null, null, window.location.pathname);
        }
    });
}

function clickAboutButton() {
    $('.intro__control #aboutButton').click(function() {
        if (!$(this).hasClass('menu_selected')) {
            $('.intro__title').addClass('intro__clickable');
            // history.pushState(null, null, window.location.pathname);
        }
    });
}

function clickSubPageHeader() {
    $('.subPageTitle').click(function() {
        // show intro header
        $('.intro').fadeIn(400);
        $('.subPageHeader').hide();
        $('#subPage .project').removeClass('active_project');
        $('#work').show();
        // scroll to top while clicking subapage header, or just landing to the page top?
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
}

function clickAboutPageHeader() {
  $('.intro__title').click(function() {
      if ($(this).hasClass('intro__clickable')) {
          $('#work').show();
          $('#about').hide();
          $('#workButton').addClass("menu_selected");
          $('#aboutButton').removeClass("menu_selected");
          $('.intro__title').removeClass('intro__clickable');
      }
  });
}

function hoverOnWork() {
    $('.item').hover(function() {
        var index = $('.item').index(this);
        $('.item__title').eq(index).show();
    }, function() {
        $('.item__title').fadeOut(200);
    });
}

function clickPrevNavControl() {
    $('#prev').click(function () {
        var index = $('.page-project').index($('.active_project'));
        if (index !== 0) {
            $('#subPage .project').eq(index).removeClass('active_project');
            $('#subPage .project').eq(index-1).addClass('active_project');
        }
        $("html, body").animate({ scrollTop: 0 }, 0);
    });
}

function clickNextNavControl() {
    $('#next').click(function () {
        var index = $('.page-project').index($('.active_project'));
        if (index !== 9) {
            $('#subPage .project').eq(index).removeClass('active_project');
            $('#subPage .project').eq(index+1).addClass('active_project');
        } else {
            $('#subPage .project').eq(index).removeClass('active_project');
            $('#subPage .project').eq(0).addClass('active_project');
        }
        $("html, body").animate({ scrollTop: 0 }, 0);
    });
}

function removeHash() {
    window.history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}

var docElem = document.documentElement,
    introHeader = document.querySelector( '.intro' ),
    didScroll = false,
    changeHeaderOn = 100;

function scrollHeaderInit() {
    window.addEventListener( 'scroll', function( event ) {
        if( !didScroll ) {
            didScroll = true;
            setTimeout( scrollPage, 250 );
        }
    }, false );
}

function scrollPage() {
    var sy = scrollY();
    if ( sy >= changeHeaderOn ) {
        classie.add( introHeader, 'cbp-af-header-shrink' );
    }
    else {
        classie.remove( introHeader, 'cbp-af-header-shrink' );
        if ($('#container').hasClass('container--open')) {
            classie.add(introHeader, 'disable-transition');
        }

    }
    didScroll = false;
}

function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
}

function switchIntroControl() {
  $('.intro__control a').eq(0).addClass("menu_selected"); // set work as default
  var defaultHiddenIndex = $('.intro__control a').eq(1).attr('for');
  $('#'+defaultHiddenIndex).hide(); // hide the other one about
  $('.intro__control a').click(function() {
      $(this).addClass("menu_selected").siblings().removeClass("menu_selected");
      var index = $(this).index(this);
      var shownIndex = $(this).eq(index).attr('for');
      var hiddenIndex = $(this).eq(index).siblings().attr('for');
      $('#'+shownIndex).show();
      $('#'+hiddenIndex).hide();
  });
}

$(document).ready(function(){
    clickAboutButton();
    clickWorkButton();
    switchIntroControl();
    clickSubPage();
    clickSubPageHeader();
    clickPrevNavControl();
    clickNextNavControl();
    clickAboutPageHeader();
    hoverOnWork();
    scrollHeaderInit();
});
