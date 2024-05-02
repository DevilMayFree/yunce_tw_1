jQuery(document).ready(function ($) {

	let winW = window.innerWidth;
	let yearWidth = winW / 2;
	let dotPosArray = [];
	let yearArray = [];
	let startLimit = $('.timl_title').outerWidth(); //起始邊界 10vw
	let chartMarginLeft;

	$('.tls_slider').on('init', function(){
		tlsSlidImg();
		hidePrevNext();
		generateChart();
	});
	$('.tls_slider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		centerMode: true,
		variableWidth: true,
		nextArrow: $('.timl_next'),
		prevArrow: $('.timl_prev'),
	});
	$('.tls_slider').on('afterChange', function(event, slick, currentSlide){
		tlsSlidImg();
		hidePrevNext();
	});
	$('.tls_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		getCloseToDot(nextSlide)
	});

	let resizeFlag = false; //防止不斷呼叫
	$(window).resize(function(){
		if( resizeFlag == false ){
			resizeFlag = true;
			setTimeout(() => {
				// console.log('reinit')
				winW = window.innerWidth;
				yearWidth = winW / 2;
				resizeFlag = false;
				resizeChart()
			}, 1000)
		}
	});

	function tlsSlidImg(){
		let tar = $('.tls_slide_obj.slick-current')
		if( tar.hasClass('has_thumb') ){
			let tarimg = tar.find('figure');
			tar.addClass('show');
			tarimg.css('background-image', 'url('+ tarimg.data('image') +')');
		};
	};

	function hidePrevNext(){
		$('.tls_slide_obj:first-child').hasClass('slick-current') ?
		$('.timl_prev').hide():
		$('.timl_prev').show();
		
		$('.tls_slide_obj:last-child').hasClass('slick-current') ?
		$('.timl_next').hide():
		$('.timl_next').show();
	};

	function resizeChart(){
		chartMarginLeft = parseInt($('.timl_title').css('padding-left')) + parseInt($('.timl_title').css('padding-right'));
		timContent.style.margin = '0px 0px 0px -' + (chartMarginLeft - 4) + 'px';
		
		$('.tls_slide_obj').each(function(idx){
			
			let curYear = $(this).find('i').text();
			let nextYear = yearArray[yearArray.indexOf(curYear)+1]; //查下一年
			let thisPoint = $('.timl_point').eq(idx)

			if( nextYear == undefined ){ //最後一個年
				nextYear = curYear - 1;
			}
			let yearDis = curYear - nextYear;
			let pieces = Math.floor( yearWidth / (yearDis * 12) ); //年份寬度 / (年份距離 * 12個月) 這是算切成幾等份
			let month = $(this).data('month');

			let dotStart = yearWidth - startLimit; //初始點點位置
			let pointDis = dotStart + (yearArray.indexOf(curYear)) * yearWidth; //找到今年是陣列第幾個來判斷前面有幾個年
			
			thisPoint.css('left', pieces * (12-month) + pointDis + 'px');
		});
		getCloseToDot(0)
	}
	
	function generateChart(){
		// let nowYear = $('.tls_slide_obj:first-child i').text();
		//生成點點
		$('.tls_slide_obj').each(function(idx){
			let curYear = $(this).find('i').text();

			if( !yearArray.includes(curYear) ){ //如果今年不在陣列就push
				yearArray.push( curYear );
			};
			$('.timl_years').before('<div class="timl_point" data-idx="' +idx+ '"></div>');
		});
		$('.timl_point:first-child').addClass('active');

		//算點點位置
		$('.tls_slide_obj').each(function(idx){
			let curYear = $(this).find('i').text();
			let nextYear = yearArray[yearArray.indexOf(curYear)+1]; //查下一年
			let thisPoint = $('.timl_point').eq(idx)

			if( nextYear == undefined ){ //最後一個年
				nextYear = curYear - 1;
			}
			let yearDis = curYear - nextYear;
			let pieces = Math.floor( yearWidth / (yearDis * 12) ); //年份寬度 / (年份距離 * 12個月) 這是算切成幾等份
			let month = $(this).data('month');
			chartMarginLeft = yearWidth / 4 + 4; //暫時先這樣解決位移問題，重新整理就沒事，不知道為什麼RWD會抓錯

			let dotStart = yearWidth - startLimit; //初始點點位置
			let pointDis = dotStart + (yearArray.indexOf(curYear)) * yearWidth; //找到今年是陣列第幾個來判斷前面有幾個年

			dotPosArray.push( pieces * (12-month) + pointDis );
			thisPoint.css('left', dotPosArray[idx] + 'px');

			//第二類點點
			let category = $(this).find('span').text();
			if( category == '里程碑' ){
				thisPoint.addClass('cate2')
			}
		});

		//生成年份寬度
		for( let i = 0 ; i < yearArray.length ; i++ ){
			$('.timl_years').append('<div class="timl_year">' + yearArray[i] + '</div>');
			$('.timl_year').eq(i).css('left', ((yearWidth - startLimit)  + yearWidth * i));
		};
		//年份總寬
		$('.timl_content').css('width', parseInt($('.timl_year:last-child').css('left')) + yearWidth * 2 + 'px' );

		$('.timl_point').click(function(){
			getCloseToDot(
				$(this).index()
			)
		});
		dragFunc( $('.timeline_chart') );
	};

	let isDown = false;
	let isMoving = false;
	let moveVal = 0;
	let MovedVal = 0;
	let timContent = document.querySelector('.timl_content');
	let nowPosition = startLimit; //初始位置與起始邊界相同
	let startClickVal; 
	
	timContent.style.transform = "translate3d(" + startLimit + "px, 0, 0)"; //起始
	timContent.style.margin = '0px 0px 0px -' + (chartMarginLeft - 4) + 'px';


	function dragFunc(obj){ 
		obj.mousedown( dragFocus );
		obj.mousemove( dragMove );
		obj.mouseup( mouseUp );
	};

	function dragMove(e){
		if ( !isDown ) return;

		let clearMouse = e.clientX - startClickVal; // (現在滑鼠X - 初始滑鼠X) 清空
		moveVal = nowPosition + clearMouse;//舊位置 + 清空

		if( Math.abs(clearMouse) > 1 ){ //防止點擊重複觸發
			isMoving = true;
		}
		//左邊邊界
		if( moveVal > startLimit ){
			moveVal = startLimit;
		}
		$(timContent).css('transform', 'translate3d('+ moveVal +'px,0,0)');

	};

	function dragFocus(e){
		isDown = true;
		timContent.classList.add('active');
		startClickVal = e.clientX; //紀錄第一次點
	}

	function mouseUp(){
		isDown = false;
		nowPosition = getTranslate3d( timContent );
		timContent.classList.remove('active');

		//更新移動過的位置
		if( !isMoving  ) return
		MovedVal = Math.abs(moveVal - startLimit) + parseInt($('.timl_point:first-child').css('left'));
		getCloseToDot(
			dotPosArray.indexOf( closest(dotPosArray, MovedVal) ) //從陣列比對找出該數值的idx
		);
		isMoving = false;
	}

	//移動時間軸目標位置
	function getCloseToDot(idx){
		let tarDot = $('.timl_point').eq( idx );
		let targetV = parseInt( tarDot.css('left') );
		let startV = parseInt($('.timl_point:first-child').css('left'));
		let finalV = startLimit - (targetV - startV);

		nowPosition = finalV; //更新位置
		timContent.classList.add('isAni');
		timContent.style.transform = 'translate3d('+ nowPosition +'px,0,0)';

		setTimeout(() => {
			timContent.classList.remove('isAni');
		}, 500);
		
		$('.timl_point').removeClass('active').eq(idx).addClass('active');
		$('.tls_slider').slick('slickGoTo' , idx);
	}

	//網路找的比對陣列，但是還不知道怎麼改成只要拿出idx就好
	function closest(array,num){
		var i = 0;
		var minDiff = 3000;
		var ans;
		for(i in array){
			 var m = Math.abs(num - array[i]);
			 if( m < minDiff){ 
					minDiff = m; 
					ans = array[i]; 
				}
		  }
		return ans;
	}

	//Tommy的拿位置
	function getTranslate3d(el) {
        var values = el.style.transform.split(/\w+\(|\);?/);
        if (!values[1] || !values[1].length) {
            return 0;
		}
		return parseInt(values[1].split(/px,\s?/g)[0]);
	}


});