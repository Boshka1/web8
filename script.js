$(document).ready(function() {
  let formData = {};

  // Восстановление данных из LocalStorage (только для демонстрации!)
  if (localStorage.getItem('formData')) {
    formData = JSON.parse(localStorage.getItem('formData'));
    $('#fio').val(formData.fio);
    $('#email').val(formData.email);
    $('#phone').val(formData.phone);
    $('#organization').val(formData.organization);
    $('#message').val(formData.message);
  }

  // ... (код для открытия/закрытия формы остается без изменений) ...


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

    $.ajax({
      type: 'POST',
      url: 'https://formcarry.com/s/GNUZA7_lclc',
      contentType: 'application/json', // Указание типа данных JSON
      data: JSON.stringify(formData), // Отправка данных в формате JSON
      success: function(response) {
        $('#form-message').html('<span style="color:green;">Форма успешно отправлена!</span>');
        $('#feedback-form')[0].reset();
        localStorage.removeItem('formData');
      },
      error: function(error) {
        console.error("Ошибка отправки формы:", error); // Выводим ошибку в консоль для отладки
        $('#form-message').html('<span style="color:red;">Ошибка отправки формы. Попробуйте еще раз.</span>');
      }
    });
  });
});
