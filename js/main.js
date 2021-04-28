/*global $, jQuery, alert*/



$(document).ready(function() {

  'use strict';

  // in order to start with beginning background color for header
  scrollingColors();

  $(".ipad").hide();
  $(".iphone8").hide();

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //

  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.attr('id');
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // // ========================================================================= //
  // //  //NAVBAR SHOW - HIDE
  // // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }

    // ========================================================================= //
    //  SCROLLING COLORS
    // ========================================================================= //
    scrollingColors();

  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["Mideo.", "Record and Listen."],
      typeSpeed: 40,
      loop: true
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 20,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: { 0: { items: 1 }, 768: { items: 1 }, 900: { items: 2 } }
    });


  // ========================================================================= //
  //  Porfolio isotope and filter
  // ========================================================================= //

  $('#portfolio').imagesLoaded( function() {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-thumbnail',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on( 'click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');
        addDescription($(this).data('filter'));
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
      });
  });




  function addDescription(type) {
      var text = document.getElementById('portfolio-description');
      $("#see-more-details").hide();
      if (type === '.iphonex') {
          hide();
          $(".iphone").show();
          $(".ipad").hide();
      } else if (type === '.ipad') {
          hide();
          $(".ipad").show();
          $(".iphone").hide();
      }
  }

  function addAppLink(link, linkText='View On The App Store') {
      var text = document.getElementById('portfolio-app-store');
      // text.href = link;
      // text.target = '_blank';
      // text.innerHTML = '<p>' + linkText + '</p>';

      text.innerHTML = '<p><a href=\"' + link + 'class=\"whitelink\">' + linkText + '</a>'
  }

  function removeAppLinks() {
      document.getElementById('portfolio-app-store').innerHTML = ''; // no app link
  }

  function hide(phonics = true) {
  }

  function scrollingColors() {
      // selectors
      var $window = $(window),
          $body = $('body'),
          $panel = $('.slide');

      // Change 33% earlier than scroll position so colour is there when you arrive.
      var scroll = $window.scrollTop() + ($window.height() / 3);

      $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 33% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

          // Remove all classes on body with color-
          $body.removeClass(function (index, css) {
            return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
          });

          // Add class of currently active div
          $body.addClass('color-' + $(this).data('color'));
        }
      });
  }
});
