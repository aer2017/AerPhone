//封装获取元素函数
var getElem = function(selector){
	return document.querySelector(selector);
}
var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}
//封装获取/设置元素样式函数
var getCls = function(element){
	return element.getAttribute('class');
}
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls = function(element,cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls)===-1){
		setCls(element,baseCls+' '+cls);
	}
}
//为元素删除样式
var delCls = function(element,cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls)!=-1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}
var navTip =getElem('.header__nav-tip');
var setNavTip = function(idx){
	navTip.style.left = (100*idx+20)+'px';
}

//第一步: 初始化样式 init
var screenAnimateElements = {
	'.screen-1' : [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow',
	],
	'.screen-2' : [
		'.screen-2__heading',
		'.screen-2__subheading',
		'.screen-2__phone',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3',
	],
	'.screen-3' : [
		'.screen-3__heading',
		'.screen-3__phone',
		'.screen-3__subheading',
		'.screen-3__features'
	],
	'.screen-4' : [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type-item_i_1',
		'.screen-4__type-item_i_2',
		'.screen-4__type-item_i_3',
		'.screen-4__type-item_i_4',
	],
	'.screen-5' : [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__back'
	],
}
var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i = 0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls+ ' '+animateElements[i].substr(1)+'_animate_init');
		}
}
var playScreenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	for(var i = 0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
			}
}
window.onload = function(){
	for(k in screenAnimateElements){
		if(k==='.screen-1')
			continue;
	setScreenAnimateInit(k);
	}
}

//第二部:滚动动画
window.onscroll = function(){
	var top = document.body.scrollTop;
	if(top>80){
		addCls(getElem('.header'),'header_status_back');
	}else{
		delCls(getElem('.header'),'header_status_back');
		switchNavItemsActive(0);
	}
	if(top>300){

		addCls(getElem('.outline'),'outline_status_in');
	}else{
		delCls(getElem('.outline'),'outline_status_in');
	}
	if(top>1){
		playScreenAnimateDone('.screen-1');
	}
	if(top>800*1-100){
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if(top>800*2-100){
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if(top>800*3-100){
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if(top>800*4-100){
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}
}

//第三步:双向定位
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');
var switchNavItemsActive = function(idx){
	for(var i = 0;i<navItems.length-1;i++){
		delCls(navItems[i],'header__nav-item_status_active');
		delCls(outlineItems[i],'outline__item_status_active');
	}
	addCls(navItems[idx],'header__nav-item_status_active');
	setNavTip(idx);
	addCls(outlineItems[idx],'outline__item_status_active');

}
switchNavItemsActive(0);
var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick= function(){
		if(i==0){ 
			document.body.scrollTop = 0;
		}else{
			document.body.scrollTop = 800*i-60;
		}
	}
}
for(var i = 0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i = 0;i<outlineItems.length;i++){
	setNavJump(i,outlineItems);
}

//第四步:滑动门特效

var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		setNavTip(idx);
	};
	var activeIdx = idx;
	lib[idx].onmouseout = function(){
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav-item_status_active')>-1){
				activeIdx = i;
				break;
			}
		}
		setNavTip(activeIdx);
	};
}
for(var i = 0;i<navItems.length-1;i++){
	setTip(i,navItems);
}

var buy = getElem('.buy__button');
buy.onclick = function(){
	alert("本次8000台Aer8s已全部售完,请您留意下次抢购时间!")
}
setTimeout(function(){
	playScreenAnimateDone('.screen-1')
},200)

