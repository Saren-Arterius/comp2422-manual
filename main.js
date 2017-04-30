var currentSection;
var showedTutorials = false;
var isMobile = function () {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

(function ($) {
  var reinitialize = function () {
    $('body').find('.materialboxed').materialbox();
    $('body').find('.collapsible').collapsible();
    Materialize.updateTextFields();
  };

  $(function () {
    $('.button-collapse').sideNav({
      'edge': 'left'
    });

    // i18n dummy
    $('#tx-live-lang-container li').click(function (e) {
      $('#tx-live-lang-current').text($(this).text());
    });

    $('#tx-live-lang-container').click(function (e) {
      if ($('#tx-live-lang-picker').hasClass('txlive-langselector-list-opened')) {
        $('#tx-live-lang-picker').removeClass('txlive-langselector-list-opened');
      } else {
        $('#tx-live-lang-picker').addClass('txlive-langselector-list-opened');
      }
    });

    $('#nav-mobile a').click(function (e) {
      var section = $(this).attr('href').substr(1);
      if (section === currentSection) {
        return;
      }
      currentSection = section;
      $('#nav-mobile > li.active').removeClass('active');
      $('.collapsible-body > ul > li.active').removeClass('active');
      if (section === 'introduction') {
        $('#nav-mobile > li > a[href="#introduction"]').parent().addClass('active');
      } else {
        $(this).parent().addClass('active');
      }

      var title = $(this).text().trim();
      $('.page-title').text(title === 'HYPERSPHERE' ? 'Introduction' : title);
      $('.button-collapse').sideNav('hide');
      if (!showedTutorials && section.indexOf('model-') !== -1) {
        var selector = isMobile() ? '#modal-mobile' : '#modal-pc';
        $(selector).modal();
        $(selector).modal('open');
        showedTutorials = true;
      }
      $.get('pages/' + section + '.html', function (html) {
        if (!$('main').children().length) {
          $('main').html(html);
          reinitialize();
        } else {
          $('html, body').animate({
            scrollTop: 0
          });
          $('main').fadeOut(function () {
            $('main').html(html);
            reinitialize();
            $('main').fadeIn();
          });
        }
      });
    });
    if (window.location.hash && window.location.hash !== '#introduction') {
      $('a[href="' + window.location.hash.replace('3d-demo', 'model-device-default') + '"]').click();
    } else {
      $('#logo-container').click();
    }
  }); // end of document ready
})(jQuery); // end of jQuery name space
