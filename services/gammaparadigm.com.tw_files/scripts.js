jQuery(document).ready(function ($) {
	let srctop = $(window).scrollTop();
	let winW = window.innerWidth;
	let mainid = $('main').attr('id');

	//暫時關閉
	// $('a, .menuopen').click(function(e){
	// 	e.preventDefault();
	// 	popMsgBox('notice', '很抱歉，我們目前正在積極的建置網站其他內容中', 'Notice')
	// });
	
	
	function headerFunc(){

		$(window).scroll(function(){
			let scrV = window.scrollY;
			let winH = window.innerHeight;

			//Header固定
			if( srctop < scrV && srctop > 0) {
				$('header').addClass('scrolldown');
			}
			else{
				$('header').removeClass('scrolldown');
			}
			srctop = scrV;
			scrV > 100 ? $('header').addClass('srlfix') : $('header').removeClass('srlfix');
			
			//滾動視差
			$('.paraani').each(function(){
				calObjgetInPara(
					$(this), //父層
					$(this), //目標物件
					scrV, //滾動值帶進來
					winH //視窗高度
				)
			});

			$('.getInAni').each(function(){
				fadeInEach(
					$(this),
					scrollY,
					winH
				);
			});
		});

		$('.menuopen').click(function(){
			$('body').toggleClass('fixed')
			if ( $('.menuopen').hasClass('open') ){
				$('.menuopen').removeClass('open');
				$('#esnav').hide();
			}else{
				$('.menuopen').addClass('open');
				$('#esnav').show();
			}
		});

		if( winW < 768 ){
			$('#menu_first .sub-menu').parents('li').prepend('<span class="subopen"></span>');
			$('.subopen').click(function(){
				if( $(this).hasClass('open') ){
					$(this).removeClass('open')
				}else{
					$(this).addClass('open')
				}
			})
		}
	}

	function pageContact(){
		$('.form_tabs h2:nth-child(1)').addClass('active');

		$('.form_tabs h2').click(function(){
			$('.form_tabs h2').removeClass('active');
			$(this).addClass('active')
			let getName = $(this).text();
			$('.cf7_form').each(function(){
				$(this).hide()
				if( $(this).data('name') == getName ){
					$(this).show()
				}
			})
		});

		$('.conpo_slide_wrap').slick({
			infinite: false,
			slidesToShow:2,
			slidesToScroll: 1,
			draggable: false,
			nextArrow: $('.hwsc_next'),
			prevArrow: $('.hwsc_prev'),
			responsive: [{
				breakpoint: 550,
				settings:{
					slidesToShow:1,
					slidesToScroll: 1,
				}
			}]
		});
	}

	function pageService(){
		let stepIdx = 0;
		let clickPrevent = false;
		$('.sestep_reapeat_title > div:first-child, .step_numbers > div:first-child, .step_lists:first-child')
		.addClass('active');

		$('.sestep_reapeat_title > div, .step_numbers > div').click(function(){
			if( clickPrevent == true ){ return false; }
			let thisIdx = $(this).index();
			stepIdx = thisIdx + 1;
			clickPrevent = true;
			
			$('.step_lists_wrap').addClass('change');
			$('.sestep_reapeat_title > div, .step_numbers > div').removeClass('active')
			$('.sestep_reapeat_title > div:nth-child('+stepIdx+'), .step_numbers > div:nth-child('+stepIdx+')').addClass('active')
			setTimeout(()=>{
				$('.step_lists').removeClass('active')
				$('.step_lists:nth-child('+stepIdx+')').addClass('active')
			}, 500)
			setTimeout(()=>{
				$('.step_lists_wrap').removeClass('change');
				clickPrevent = false;
			}, 1000)
		})

	}

	function pageBlog(){
		$('.cate_nav .sub-menu').parents('li').prepend('<i class="es-icon-arrow-down"></i>');
		$('.cate_nav i').click(function(){
			if( $(this).hasClass('active') ){
				$(this).removeClass('active').siblings('ul').slideUp()
			}else{
				$(this).addClass('active').siblings('ul').slideDown()
			}
		})
	}

	function pageRecruit(){
		$('.recslick').slick({
			infinite: true,
			slidesToShow:1,
			slidesToScroll: 1,
			nextArrow: $('.hwsc_next.rec1'),
			prevArrow: $('.hwsc_prev.rec1')
		});

		$('.intern_sli_wrap').slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '9vw',
			nextArrow: $('.hwsc_next.rec2'),
			prevArrow: $('.hwsc_prev.rec2'),
			responsive:[{
				breakpoint: 900,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	}

	function pageAbout(){
		filterTeam($('.team_nav:first-child'));
		function filterTeam(t){
			let teamArg = $('.member');

			t.addClass('active');
			$('.team_nav').not(t).removeClass('active');
			let Ltype = t.attr('data-value');

			teamArg.each(function(){
				$(this).addClass('hide ani');
				if( $(this).attr('data-value') == Ltype ){
					setTimeout(()=>{
						$(this).show();
						$(this).removeClass('hide');
					},500)
				}else{
					setTimeout(()=>{
						$(this).hide();
						$(this).removeClass('hide');
					},500)
				}
				// else if( Ltype == 'all' ){
				// 	setTimeout(()=>{
				// 		$(this).show();
				// 		$(this).removeClass('hide');
				// 	},500)
				// }
			});
		};

		$('.team_nav').click(function(){
			filterTeam($(this));
			setTimeout(()=>{
				$('html,body').animate({
					scrollTop: $('.team_head').offset().top - 100
				}, 500);
			}, 800)
		});
	}
	
	function pageHome(){
		homeMvAni();
		function homeMvAni(){
			//首頁主視覺文字進入
			$('.textIn').each(function(idx){
				var th = $(this)
				setTimeout(function(){
					th.addClass('active')
				}, idx * 200)
			});
			$('.mv_visual').addClass('isAni');
			homeMvSlide( $('.mv_slideText'), 2000 );
		}
		//輪播字樣
		function homeMvSlide(mvParent, Speed){
			var mvTextArg = mvParent.data('texts').split(",");
			var mvLen = mvTextArg.length;
	
			for( var i = 0; i < mvLen; i ++ ){
				var mvObj = mvTextArg[i];
				mvParent.append('<div>' + mvObj + '</div>');
			}
			mvParent.append('<div>' + mvTextArg[0] + '</div>');
			var mvmoveH = mvParent.height() / (mvLen+1);
			var nowH = 0;
			
			setInterval(function(){
				if( nowH < mvmoveH * mvLen ){
					nowH += mvmoveH;
				}else{
					mvParent.addClass('stopani');
					nowH = 0;
					setTimeout(function(){
						nowH = mvmoveH;
						mvParent
						.removeClass('stopani')
						.css('transform', 'translate3d(0, -'+ nowH +'px,0)');
					}, 50)
				}
				mvParent.css('transform', 'translate3d(0, -'+ nowH +'px,0)');
			}, Speed);
		};
	
		//三個高曼輪播
		$('.secsli_slides').on('init', function(){
			$('.secsli_bg figure').css('background-image','url(' + $('.secsli_obj:first-child > div').data('bgurl') + ')');
		});
		$('.secsli_slides').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			fade: true,
			speed: 1000,
			autoplay: true,
			autoplaySpeed: 2000,
		});
		var secsbg = $('.secsli_bg');
		$('.secsli_slides').on('beforeChange', function(){
			secsbg.addClass('active');
			setTimeout(() => {
				let curBgUrl = $('.secsli_obj.slick-active > div').data('bgurl');
				$('.secsli_bg figure').css('background-image','url(' + curBgUrl + ')');
			}, 500);
		});
		$('.secsli_slides').on('afterChange', function(){
			secsbg.removeClass('active');
		});
	
		//金融機構點擊
		$('.hws_nav > div').click(function(){
			var curDistance = $(this).offset().left;
	
			$('.hws_nav > div').not(this).removeClass('active');
			$(this).addClass('active')
	
			$('#tarLine_hws').css({
				'width': $(this).width(),
				'transform': 'translate3d(' + curDistance + 'px,0,0)'
			});
	
			$('.hws_cover').addClass('active');
			setTimeout(() => {
				$('.hwsc_slider').slick('unslick');
				var curSlide = $('.hwsc_slider').html();
				var nextSlide = $('.hwsc_nexthide').html();
				$('.hwsc_slider').html(nextSlide);
				$('.hwsc_nexthide').html(curSlide);
				hwscSlide();
				$('.hwsc_image').prepend($('.hwsc_image figure:last-child'));
			}, 500)
			setTimeout(() => {
				$('.hws_cover').removeClass('active');
			}, 1000);
		});
		
	
		//首頁howwedoit
		hwscSlide();
		function hwscSlide(){
			$('.hbar_cur').text('01');
			var hwsNumbL;
			$('.hwsc_slider').on('init', function(event, slick){
				hwsNumbL = $('.hwsc_slider .hwsc_sliobj:not(.slick-cloned)').length;
				$('.hbar_total').text( '0' + hwsNumbL );
				$('.hwscnum_bar i').css('width', 100 / hwsNumbL +  '%');
				$('.hwsc_icons img').attr('src', $('.hwsc_sliobj:first-child').data('iconimg'));
			});
			$('.hwsc_slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				nextArrow: $('.hwsc_next'),
				prevArrow: $('.hwsc_prev'),
			});
			$('.hwsc_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$('.hwscnum_bar i').css('width', 100 / hwsNumbL * (nextSlide + 1) + '%');
				$('.hbar_cur').text( '0' + (nextSlide + 1) );
				$('.hwsc_icons').addClass('rotate');
				setTimeout(() => {
					$('.hwsc_icons img').attr('src', $('.hwsc_sliobj.slick-current').data('iconimg'));
				}, 250);
				setTimeout(() => {
					$('.hwsc_icons').removeClass('rotate');
				}, 500);
			});
		};
		
		$('.thco_obj:nth-child(2)').addClass('active')
		$('.thco_obj').mouseover(function(){
			$('.thco_obj').not(this).removeClass('active');
			$(this).addClass('active');
		});

		$('.hms_nav_el').click(function(){
			var curDistance = $(this).offset().left;
			var thidx = $(this).index() + 1;
			$('#tarLine').css('transform', 'translate3d(' + curDistance + 'px,0,0)');
			
			$('html, body').animate({
				scrollTop: $('.hms_sec-'+ thidx +'').offset().top
			}, 500);
		});

		$(window).scroll(function(){
			
			let scrV = window.scrollY;
			let winH = window.innerHeight;

			let hmwinHei = $(window).height() / 2;
			let hmsecTone = $('.hms_sec-1').offset().top - hmwinHei;
			let hmsecTtwo = $('.hms_sec-2').offset().top - hmwinHei;
			let hmsecTthree = $('.hms_sec-3').offset().top - hmwinHei;
			let hmsecImg = $('.hms_fixa');
			let curNavPosition = document.querySelectorAll('.hms_nav > div');

			
			if( scrV > hmsecTone && scrV < hmsecTtwo ){
				hmsecImg.attr('data-active', 1);
				$('#tarLine').css( 'transform', 'translate3d(' + curNavPosition[0].offsetLeft + 'px,0,0)' );

				$('.hms_img-1').addClass('show');
				$('.hms_img-2, .hms_img-3').removeClass('show');
				$('.hms_nav_el').removeClass('active');
				$('.hms_nav_el:nth-child(1)').addClass('active');

			}else if( scrV > hmsecTtwo && scrV < hmsecTthree ){
				hmsecImg.attr('data-active', 2);
				$('#tarLine').css( 'transform', 'translate3d(' + curNavPosition[1].offsetLeft + 'px,0,0)' );
				$('.hms_img-2').addClass('show');
				$('.hms_img-1, .hms_img-3').removeClass('show');

				$('.hms_nav_el').removeClass('active');
				$('.hms_nav_el:nth-child(2)').addClass('active');
				
			}else if( scrV > hmsecTthree ){
				hmsecImg.attr('data-active', 3);
				$('#tarLine').css( 'transform', 'translate3d(' + curNavPosition[2].offsetLeft + 'px,0,0)' );
				$('.hms_img-3').addClass('show');
				$('.hms_img-1, .hms_img-2').removeClass('show');

				$('.hms_nav_el').removeClass('active');
				$('.hms_nav_el:nth-child(3)').addClass('active');
			};

			if( scrV > hmsecTone && scrV < hmsecTthree ){
				$('.hms_bg').addClass('show');
			}else{
				$('.hms_bg').removeClass('show');
			}

			if( scrV > 0 && scrV < $('.hm_scrollchange').offset().top ){
				$('.secsli_bg').css('transform' , 'translate3d(0,-' + scrV / 10 + 'px,0)')
			};

			let homeTeamIn = $('.hm_team_section').offset().top - winH;

			if( scrV > homeTeamIn && scrV < $('.hws_head').offset().top ){
				$('.hts_bg').css({
					'transform' : 'translate3d(0,-'+ (scrV - homeTeamIn) / 10 +'px, 0',
					'visibility' : 'visible'
				})
			}else{
				$('.hts_bg').css({
					'visibility' : 'hidden'
				})
			};
		});
		setTimeout(()=>{homeLinePosition()}, 500)
		$(window).resize(function(){
			homeLinePosition()
		});
		function homeLinePosition(){
			$('#tarLine_hws').css({
				'width': $('.hws_nav .active').width(),
				'transform': 'translate3d(' + $('.hws_nav .active').offset().left + 'px,0,0)'
			});
			$('#tarLine').css({
				'width': $('.hms_nav_el.active').width(),
				'transform': 'translate3d(' + $('.hms_nav_el.active').offset().left + 'px,0,0)'
			});	
		}
	}

	//讀取
	if( $('.page_notransi').length ){
		headerFunc();
		pageBlog();
	}else{
		// setTimeout(() => {
			// $('body').addClass('loaded');
			// setTimeout(()=>{ $('body').addClass('getIn') }, 800)
			headerFunc();
	
			$('a').click(function(e){
				if( $(this).text() == '加入高曼 News 電子報' ){
					e.preventDefault();
					$('html, body').animate({
						scrollTop: $(document).height()
					}, 1500);
				}else{
					let targ = $(this).attr('target');
					let link = $(this).attr('href');
					if( targ != '_blank' ){
						if( !$(this).hasClass('notransi') ){
							e.preventDefault();
							window.location = link;
							// $('body').addClass('leave');
							// setTimeout(()=>{
							// 	window.location = link;
							// }, 800)
						}
					}
				}
			})
			switch (mainid){
				case 'pageHome': pageHome() ; break; 
				case 'pageAbout': pageAbout(); break; 
				case 'pageService': pageService(); break;
				case 'pageBlog': pageBlog(); break;
				case 'pageRecruit': pageRecruit(); break;
				case 'pageContact': pageContact(); break;
			}
		// }, 1000);
	}
	

});
