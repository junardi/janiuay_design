// global delay below 

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

// navModule Below

var navModule = (function() {
	
	var $first_nav = $("#first_nav");
	var $second_nav = $("#second_nav");
	
	var $is_dropdown = $('.is_dropdown');
	var $is_second_level_dropdown = $('.is_second_level_dropdown');
	var $is_third_level_dropdown = $('.is_third_level_dropdown');
	
	var $has_dropdown = $('.has_dropdown');
	var $entering_dropdown;
	
	var $first_level_has_side_dropdown = $('.first_level_has_side_dropdown');
	var $second_level_has_side_dropdown = $('.second_level_has_side_dropdown');

	var exiting_dropdown = function() {
		// first level exit below
		$is_dropdown.fadeOut('fast');
		$is_dropdown.removeClass('active_dropdown');
		// second level exit below 
		$is_second_level_dropdown.fadeOut('fast');
		// third level exit below 
		$is_third_level_dropdown.fadeOut('fast');
	};
	
	var more_click = function() {
		$(".more_nav").click(function(){
			exiting_dropdown();
			$first_nav.fadeOut(function(){
				$second_nav.fadeIn();
			});
			return false;
		});
	};
	
	var back_click = function() {
		$(".back_nav").click(function(){
			exiting_dropdown();
			$second_nav.fadeOut(function(){
				$first_nav.fadeIn();
			});
			return false;
		});
	};
	
	var exec_bottom_drop = function() {
	
		$has_dropdown.mouseenter(function(){

			// close first the current active dropdwown
			exiting_dropdown();
			
			// then execute the current dropdown
			var need_to_drop = $(this).attr('id');
			$("." + need_to_drop).slideDown('fast');
			$("." + need_to_drop).addClass('active_dropdown');
			
			// if entering the active dropdown below
			$('.active_dropdown').mouseenter(function(){
				$entering_dropdown = 1;
			});
		});
		
		$has_dropdown.click(function(){
			var need_to_drop = $(this).attr('id');
			$("." + need_to_drop).fadeOut('fast');
			return false;
		});
		
		$(document).on('mouseleave', '.active_dropdown', function(){
			if($entering_dropdown) {
				/*$(this).fadeOut();
				$(this).removeClass('active_dropdown');*/
				exiting_dropdown();
			}
		});
		
		// overall exiting of the dropdowns below
		/*$(document).click(function(e){
			if($(e.target).is('.is_dropdown, .is_dropdown *:not(.is_dropdown li a)')) {
				return false;
			} else {
				exiting_dropdown();
			}
		});*/
	};
	
	var exec_second_drop = function() {
		
		$first_level_has_side_dropdown.mouseenter(function(){
			// close first the current side dropdown 
			$(document).find('.first_level_active_side_dropdown').fadeOut('fast');
			
			// declare the attr
			var need_to_side_drop = $(this).attr('id');
			
			// kill the active side dropdown
			$("." + need_to_side_drop).removeClass('first_level_active_side_dropdown');
			
			// then execute slidedown and add a active side dropdown
			$("." + need_to_side_drop).slideDown('fast', function(){
				$is_third_level_dropdown.fadeOut('fast');
			});
			
			$("." + need_to_side_drop).addClass('first_level_active_side_dropdown');
		});
		
	};
	
	var exec_third_drop = function() {
		$second_level_has_side_dropdown.mouseenter(function(){
			// close first the current side dropdown 
			$(document).find('.second_level_active_side_dropdown').fadeOut('fast');
			
			// declare the attr
			var need_to_side_drop = $(this).attr('id');
			
			// kill the active side dropdown
			$("." + need_to_side_drop).removeClass('second_level_active_side_dropdown');
			
			// then execute slidedown and add a active side dropdown
			$("." + need_to_side_drop).slideDown('fast');
			$("." + need_to_side_drop).addClass('second_level_active_side_dropdown');
		});
		
	};
	
	return {
		more_click: more_click,
		back_click: back_click,
		exec_bottom_drop: exec_bottom_drop,
		exec_second_drop: exec_second_drop,
		exec_third_drop: exec_third_drop
	}
	
})()

// Execute navModule below

navModule.more_click();
navModule.back_click();
navModule.exec_bottom_drop();
navModule.exec_second_drop();
navModule.exec_third_drop();

// slideshowModule Below 

var slideshowModule = (function() {
	
	var $first_image = $("#featured .featured_image div:first");
	var $last_image = $("#featured .featured_image div:last-child");
	
	var $leftArrow = $("#featured .left_arrow");
	var $rightArrow = $("#featured .right_arrow");
	
	var $arrowIsClick;
	
	var mouseActions = function() {
		
		$("#featured .featured_image").mouseenter(function(){
			$leftArrow.fadeTo('fast', 0.5);
			$rightArrow.fadeTo('fast', 0.5);
		}).mouseleave(function(){
			$leftArrow.fadeTo('fast', 0);
			$rightArrow.fadeTo('fast', 0);
		});
		
		$rightArrow.mouseenter(function(){
			$(this).fadeTo('fast', 0.8);
			$leftArrow.fadeTo('fast', 0.5);
		});
		
		$leftArrow.mouseenter(function(){
			$(this).fadeTo('fast', 0.8);
			$rightArrow.fadeTo('fast', 0.5);
		});

	};
	
	var executeSlide = function() {
		
		$(document).on('click', '#featured .featured_image div.current',  function(event, action) {
		
			if(action !== undefined && action === "left") {
			
				if($(this).prev().length === 0) {
					$(this).fadeOut('slow').removeClass("current");
					$last_image.addClass("current").fadeIn();
				} else {
					$(this).fadeOut('slow').removeClass("current");
					$(this).prev().addClass("current").fadeIn();
				}
		
			} else if(action !== undefined && action === "right") {
				
				if($(this).next().length === 0) {
					$(this).fadeOut().removeClass("current");
					$first_image.addClass("current").fadeIn();
				} else {
					$(this).fadeOut().removeClass("current");
					$(this).next().addClass("current").fadeIn();
				}
			}
		});
	};
	
	var arrowsClick = function() {
		
		$leftArrow.click(function(){
			$arrowIsClick = 1;
			$("#featured .featured_image div.current").trigger('click',["left"]);
		}); 
		
		$rightArrow.click(function(){
			$arrowIsClick = 1;
			$("#featured .featured_image div.current").trigger('click',["right"]);
		});
		
	};
	
	var rotate = function() {
	
		delay(function(){
		
			function start() {
				$arrowIsClick = 0;
				$("#featured .featured_image div.current").trigger('click',["right"]);
			}
			
			setInterval(start, 3000);
		}, 1000 );
	};
	
	return {
		executeSlide: executeSlide,
		arrowsClick: arrowsClick,
		mouseActions: mouseActions,
		rotate: rotate
	}
	
})()

// execute slideShow module below 

slideshowModule.executeSlide();
slideshowModule.arrowsClick();
slideshowModule.mouseActions();
slideshowModule.rotate();

// contactModule below

var contactModule = (function() {
	
	var $email = $(".contact #email");
	var $full_name = $('.contact #full_name');
	var $subject = $('.contact #subject');
	var $message = $('.contact #message');
	
	var $contact_form = $(".contact #contact_form");
	
	var $main_input_validation = $(".contact .input_validation");
	
	var inputKeyup = function() {
		
		// email focus and keyup
		$email.focus(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			if($(this).validEmail()) {
				inputValidation.html('<p>&#8592; Email entered is valid</p>');
			} else {
				inputValidation.html('<p>&#8592; Pls. enter valid Email</p>');
			}
			
		}).keyup(function(){

			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			inputValidation.fadeIn();
			
			if($(this).validEmail()) {
				inputValidation.html('<p>&#8592; Email entered is valid</p>');
				inputValidation.removeClass('error').addClass('good');
			} else {
				inputValidation.html('<p>&#8592; Pls. enter valid Email</p>');
				inputValidation.removeClass('good').addClass('error');
			}
		});
		
		// full name focus and keyup
		
		$full_name.focus(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Full Name</p>');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
			}
		}).keyup(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			inputValidation.fadeIn();
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Full Name</p>');
				inputValidation.removeClass('error').addClass('good');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
				inputValidation.removeClass('good').addClass('error');
			}
		});
		
		// subject focus and keyup 
		
		$subject.focus(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Subject</p>');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
			}
		}).keyup(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			inputValidation.fadeIn();
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Subject</p>');
				inputValidation.removeClass('error').addClass('good');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
				inputValidation.removeClass('good').addClass('error');
			}
		});
		
		// message focus and keyup
		
		$message.focus(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Message</p>');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
			}
		}).keyup(function(){
			var inputValidation = $(this).parent('td').siblings('.input_validation');
			
			inputValidation.fadeIn();
			
			if($(this).val() !== "") {
				inputValidation.html('<p>&#8592; Enter your Message</p>');
				inputValidation.removeClass('error').addClass('good');
			} else {
				inputValidation.html('<p>&#8592; Must not be blank</p>');
				inputValidation.removeClass('good').addClass('error');
			}
	
		});
	
	};
	
	var contact_submit = function() {
		$contact_form.on('submit', function(){
		
			if($('.contact .error').length > 0) {
				
				$('.contact .error').each(function(){
					
					if($(this).prev().children().attr('id') === "email") {
						$(this).fadeIn().html("<p>&#8592; Pls. enter valid email</p>");
					} else {
						$(this).fadeIn().html("<p>&#8592; Must not be blank</p>");
					}
					
				});
			
				return false;
			} else {
				return true;
			}
		});
	};
	
	return {
		inputKeyup: inputKeyup,
		contact_submit: contact_submit
	}
	
})()

// Execute contactModule below 

contactModule.inputKeyup();
contactModule.contact_submit();

// Gallery Module Below

var imageGalleryModule = (function() {
	
	var $image = $("#content_area .gallery img");
	var $gallery_popup = $("#gallery_popup");
	var $close = $("#gallery_popup #wrap_image img.close");
	
	var image_click = function() {
		
		$image.click(function(){
			$('body').animate({scrollTop: 0}, 'slow');
			
			var to_show_image = $(this).attr('src');
			$gallery_popup.fadeIn('fast', function(){
				$(this).children('#wrap_image').children('.showed').attr('src', to_show_image);
			}).css('height', $(document).height());
	
		});
	};
	
	var close_image_click = function() {
		$close.click(function(){
			$gallery_popup.fadeOut('fast', function(){
				$(this).children('#wrap_image').children('.showed').attr('src', 'img/gallery/bg.png');
			});
		});
	};
	
	return {
		image_click: image_click,
		close_image_click: close_image_click
	}

})()

// Execute Gallery Module Below

imageGalleryModule.image_click();
imageGalleryModule.close_image_click();






















