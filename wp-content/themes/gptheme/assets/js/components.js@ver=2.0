//滾動視差
//算物件進入畫面時才開始特效
function calObjgetInPara(wrap, obj, srcV, winH){
	if( obj.length ){ 
		var offTop = wrap.offset().top; 
		var objBottom = wrap.outerHeight(true) + offTop; 
		
		if( (srcV+winH) > offTop && srcV < objBottom ){
			//開始特效
			calPara(
				obj.attr('data-para'), obj, (srcV+winH)-offTop
			);
		};
	};
};
//滾動特效
function calPara(paraVal, obj, scrV){
	let theVal = scrV * paraVal;
	obj.css({
		'transform': 'translate3d(0,-' + theVal + 'px,0)'
	});
};
//進入畫面動畫
function fadeInEach(obj, scrV, winH){
	var offTop = obj.offset().top; //物件頂
	if( (scrV+winH) > offTop ){
		obj.addClass('act_ani')
	}
};
function openSharePop(url) {
    window.open(
		url, 'shareWindow',
		'menubar=0,location=0,toolbar=0,status=0,scrollbars=1,width=800,height=600');
}
// $('.getInAni').each(function(){
// 	fadeInEach(
// 		$(this),
// 		scrollY,
// 		winH
// 	);
// });
// $('.getInCus').each(function(){
// 	fadeInEach(
// 		$(this),
// 		scrollY,
// 		winH
// 	);
// })

// 消息提醒的
// 使用方式：
// popMsgBox('型態', '訊息文字', '標題', 'Boolean 是否有按鈕', '確認按鈕的連結');
// 第一個型態有(alert紅色, notice藍色)
function popMsgBox(type, msg, title, isbtn, callback){

	var dia        = document.createElement('div'),
		close      = document.createElement('div'),
		diabg      = document.createElement('div'),
		diacontent = document.createElement('div'),
		diaHead    = document.createElement('h3'),
		diaText    = document.createElement('p');

	dia.classList.add('dialog', 'msg_box');
	diabg.classList.add('diabg');
	close.classList.add('dia_close');
	diacontent.classList.add('dia_content');

	document.body.classList.add('dia_open');
	document.body.appendChild(dia);

	dia.appendChild(diacontent);
	dia.appendChild(diabg);
	diacontent.appendChild(diaHead);
	diacontent.appendChild(diaText);
	diacontent.appendChild(close);

	// console.log(type);

	switch(type){
		case 'alert' :
		dia.classList.add('alert'); break;
		case 'notice' :
		dia.classList.add('notice'); break;
	}

	diaHead.textContent = title;
	diaText.textContent = msg;
	
	jQuery(close).click(function(){
		closeDia();
	})
	jQuery('.diabg').click(function(e){
		closeDia();
	})

	if( isbtn ){
		var btnlist = document.createElement('div');
		btnlist.classList.add('msg_btns');
		diacontent.appendChild(btnlist);

		jQuery(btnlist).append('<div class="esbtn border alert small"><button id="cancelDialog">取消</button></div>');
		jQuery(btnlist).append('<div class="esbtn border small"><button id="diaCallBack">確認</button></div>');

		$('#diaCallBack').click(callback);
		$('#cancelDialog').click(function(){
			closeDia();
		})
	}
};
function closeDia(){
	document.body.classList.remove('dia_open');
	jQuery('.dialog, .diabg').fadeOut(200);
	setTimeout(function(){
		jQuery('.dialog, .diabg').remove();
	}, 300);
};

function slideToAnchor(clickobj, target, speed){
	clickobj.click(function(){
		jQuery('html,body').animate({
			scrollTop: target.offset().top
		}, speed);
	});
};
