$(document).ready(function () {

  $.validator.addMethod('letter_digit', function (value, element, param) {
    var nameRegex = /^[a-zA-Z0-9]+$/;
    return value.match(nameRegex);
  }, 'Only a-z, A-Z, 0-9 characters are allowed');

  $.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  }, "Letters only please");

  $.validator.addMethod("strong_password", function (value, element) {
    let password = value;
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,20}$)/.test(password))) {
      return false;
    }
    return true;
  }, function (value, element) {
    let password = $(element).val();
    if (!(/^(.{8,20}$)/.test(password))) {
      return 'Password must be between 8 to 20 characters long.';
    }
    else if (!(/^(?=.*[A-Z])/.test(password))) {
      return 'Password must contain at least one uppercase.';
    }
    else if (!(/^(?=.*[a-z])/.test(password))) {
      return 'Password must contain at least one lowercase.';
    }
    else if (!(/^(?=.*[0-9])/.test(password))) {
      return 'Password must contain at least one digit.';
    }
    return false;
  });
  var val = {
    rules: {
      email: {
        required: true,
        email: true
      },
      first_name:{
        required: true,
        lettersonly:true,
        minlength: 3,
        maxlength:20
      },
      last_name:{
        required: true,
        lettersonly:true,
        minlength: 3,
        maxlength:20
      },
      password: {
        required: true,
        strong_password: true
      },
      password_confirm: {
        required: true,
        equalTo: "#password"
      },
      country: {
        required: true,
        lettersonly: true,
        minlength: 3,
        maxlength:12
      },
      adress: {
        required: true,
        minlength: 5,
        maxlength:20
      },
      im_type: {
        required: true
      },
      contact_info: {
        required: true,
        minlength: 5,
        maxlength:20
      },
      contact_name:{
        required: true,
        minlength: 3,
        maxlength:20
      },
      link:{ 
        required: true,
        minlength: 3,
        maxlength:20
      },
      main_verticals: {
        required: true,
        minlength: 1
      },
      CPA_networks_work_with:{
        required: true,
        minlength: 3,
        maxlength:20
      },
      traffic_types: {
        required: true,
        minlength: 1
      },
      top_geo: {
        required: true,
        minlength: 1
      },
      promo_code:{ 
        required: true,
        minlength: 3,
        maxlength:20
      },
      hear_about_us:{
        required: true,
        minlength: 3,
        maxlength:20
      },
      agree_receive_news: {
        required: true,
      },
      agree_with_terms: {
        required: true,
      }
   
    },
    messages: {
      email: {
        required: "Email is required",
        email: "Please enter a valid e-mail",
      },
      password: {
        required: "Password is required",
        minlength: "Password should be minimum 8 characters",
        maxlength: "Password should be maximum 16 characters",
      }

    }
  }
  $("#register_form").multiStepForm(
    {
      beforeSubmit: function (form, submit) {
        console.log("called before submiting the form");
        console.log(form);
        console.log(submit);
      },
      validations: val,
    }
  ).navigateTo(0);
});

(function ($) {
  $.fn.multiStepForm = function (args) {
    if (args === null || typeof args !== 'object' || $.isArray(args))
      throw " : Called with Invalid argument";
    var form = this;
    var tabs = form.find('.tab');
    var steps = form.find('.step');
    steps.each(function (i, e) {
      $(e).on('click', function (ev) {
      });
    });
    form.navigateTo = function (i) {/*index*/
      tabs.removeClass('current').eq(i).addClass('current');
      form.find('.previous').toggle(i > 0);
      atTheEnd = i >= tabs.length - 1;
      form.find('.next').toggle(!atTheEnd);
      form.find('.submit').toggle(atTheEnd);
      fixStepIndicator(curIndex());
      return form;
    }
    function curIndex() {
      return tabs.index(tabs.filter('.current'));
    }
    function fixStepIndicator(n) {
      steps.each(function (i, e) {
        i == n ? $(e).addClass('active') : $(e).removeClass('active');
      });
    }
    form.find('.previous').click(function () {
      form.navigateTo(curIndex() - 1);
    });

    form.find('.next').click(function () {
      if ('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)) {
        if (!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)) {
          form.validate(args.validations);
          if (form.valid() == true) {
            form.navigateTo(curIndex() + 1);
            return true;
          }
          return false;
        }
      }
      form.navigateTo(curIndex() + 1);
    });
    form.find('.submit').on('click', function (e) {
      if (typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
        args.beforeSubmit(form, this);
      if (typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)) {
        if (form.valid) {
          form.submit();
        }
      }
      return form;
    });
    typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;
    form.noValidate = function () {

    }
    return form;
  };
}(jQuery));