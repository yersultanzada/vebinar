(function ($) {
	$(".contact-form").submit(function (event) {
		event.preventDefault();
		let form = $('#' + $(this).attr('id'))[0];
		// Сохраняем в переменную класс формы
		let formClass = $(this).attr('class');

		// Сохраняем в переменные дивы, в которые будем выводить текст ошибки
		let inpNameError = $(this).find('.contact-form__error_name');
		let inpTelError = $(this).find('.contact-form__error_tel');

		// Сохраняем в переменную див, в который будем выводить сообщение формы
		let formDescription = $(this).find('.contact-form__description');

		let fd = new FormData(form);
		$(".contact-form i.fa-phone").css({
			'display': 'none'
		});
		$("._preloader").css({
			'display': 'inline-block'
		});
		$.ajax({
			url: "/mail/php/mail.php",
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,
			success: function success(res) {
				console.log(res);
				let respond = $.parseJSON(res);
				
				if (respond.name) {
					inpNameError.text(respond.name);
				} else {
					inpNameError.text('');
				}

				if (respond.tel) {
					inpTelError.text(respond.tel);
				} else {
					inpTelError.text('');
				}

				if (respond.attantion) {
					formDescription.text(respond.attantion).css('color', '#e84a66').fadeIn();
				} else {
					formDescription.text('');
				}

				if (respond.success) {
					$("._preloader").css({
						'display': 'none'
					});
					$(".contact-form i.fa-phone").css({
						'display': 'inline-block'
					});
					formDescription.text(respond.success).fadeIn();
					$('.'+formClass).find('input').val('');
					setTimeout(() => {
						formDescription.fadeOut("fast");
					}, 2000);
					setTimeout(() => {
						formDescription.text('');
					}, 4000);
				}
			},
		});
	});
}(jQuery));