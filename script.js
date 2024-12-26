$(document).ready(function() {
  let formData = {};

  // Восстановление данных из LocalStorage
  if (localStorage.getItem('formData')) {
    formData = JSON.parse(localStorage.getItem('formData'));
    $('#fio').val(formData.fio);
    $('#email').val(formData.email);
    $('#phone').val(formData.phone);
    $('#organization').val(formData.organization);
    $('#message').val(formData.message);
  }

  $('#open-form').click(function() {
    $('#popup-form').removeClass('hidden');
    history.pushState({}, '', '?form=open');
  });

  $('#close-form').click(function() {
    $('#popup-form').addClass('hidden');
    history.back();
  });

  window.onpopstate = function(event) {
    if (event.state === null) {
      $('#popup-form').addClass('hidden');
    }
  };

  $('#feedback-form').submit(function(e) {
    e.preventDefault();
    $('#form-message').text('');

    formData = {
      fio: $('#fio').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      organization: $('#organization').val(),
      message: $('#message').val(),
    };

    // Сохранение данных в LocalStorage (только для демонстрации!)
    localStorage.setItem('formData', JSON.stringify(formData));

    // Замените 'YOUR_FORM_ENDPOINT' на ваш endpoint
    $.ajax({
      type: 'POST',
      url: 'https://formcarry.com/s/GNUZA7_lclc', // Endpoint вашего сервиса
      data: formData,
      success: function(response) {
        $('#form-message').html('<span style="color:green;">Форма успешно отправлена!</span>');
        $('#feedback-form')[0].reset();
        localStorage.removeItem('formData');
      },
      error: function(error) {
        $('#form-message').html('<span style="color:red;">Ошибка отправки формы. Попробуйте еще раз.</span>');
      }
    });
  });
});
