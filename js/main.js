/* 
	2018.8.26 modify by lcc 
	based on the js plugin http://www.htmleaf.com/jQuery/Menu-Navigation/20141212771.html 
	based on other unknown sources...
	thanks for their open sources!
*/
jQuery(document).ready(function($) {

	"use strict";

	/* Preloader */
	var Annie_Preloader = function() {
		/*
		$(window).on("load", function() {	
			// fade out the loading animation
			$("#status").fadeOut();

			//fade out the white DIV that covers the website
			$("#preloader").delay(400).fadeOut("slow");
		});
		*/
		$(window).on('load', function() {
			$('#status').fadeOut();
			$('#preloader').delay(550).fadeOut('slow');
			$('body').delay(550).css({
				'overflow': 'visible'
			});
		});
	};

	/* Nav */
	var Annie_Nav = function() {
		// browser window scroll (in pixels) after which the "menu" link is shown
		var offset = 300;
		var navigationContainer = $('#cd-nav');
		var mainNavigation = navigationContainer.find('#cd-main-nav ul');

		//hide or show the "menu" link
		checkMenu();

		$(window).scroll(function() {
			checkMenu();
		});

		//open or close the menu clicking on the bottom "menu" link
		$('.cd-nav-trigger').on('click', function() {
			$(this).toggleClass('menu-is-open');

			//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
			mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
		});

		function checkMenu() {
			if($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
				navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
					mainNavigation.addClass('has-transitions');
				});
			} else if($(window).scrollTop() <= offset) {

				//check if the menu is open when scrolling up
				if(mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
					//close the menu with animation
					mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
						//wait for the menu to be closed and do the rest
						mainNavigation.removeClass('is-visible is-hidden has-transitions');
						navigationContainer.removeClass('is-fixed');
						$('.cd-nav-trigger').removeClass('menu-is-open');
					});

					//check if the menu is open when scrolling up - fallback if transitions are not supported
				} else if(mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
					mainNavigation.removeClass('is-visible has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');

					//scrolling up with menu closed
				} else {
					navigationContainer.removeClass('is-fixed');
					mainNavigation.removeClass('has-transitions');
				}
			}
		}
	};

	/* Random bg-img for header*/
	var Annie_Random = function() {
		//generate a random img that pre_name 'from 0 to 110'
		var random_bg = Math.floor(Math.random() * 109 + 1);

		//var bg = 'url(/img/random/' + random_bg + '.jpg)';
		var bg = 'url(https://annie-header-bg-1253939655.cos.ap-beijing.myqcloud.com/' + random_bg + '.jpg)';

		$("#header-bg-2").css("background-image", bg);
	};

	/* ToTop */
	var Annie_ToTop = function() {
		var upperLimit = 500;

		// Our scroll link element
		var scrollElem = $('#totop');

		// Scroll to top speed
		var scrollSpeed = 500;

		scrollElem.hide();

		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();

			if(scrollTop > upperLimit) {
				$(scrollElem).stop().fadeTo(300, 1);
			} else {
				$(scrollElem).stop().fadeTo(300, 0);
			}
		});

		$(scrollElem).click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, scrollSpeed);
			return false;
		});
	};

	/* Show Comment */
	var Annie_Comment = function() {
		function Show_Hidden(obj) {
			var obj = $('#annie-comment-container');
		}

		var obutton = document.getElementById("annie-comment-button");
		var odiv = document.getElementById("annie-comment-container");
		//var obutton = $('#annie-comment-button');
		//var odiv = $('#annie-comment-container');	
		if('obutton') {
			obutton.onclick = function() {
				Show_Hidden(odiv);
				$("#annie-comment-button").css("display", 'none');
				return false;
			}
		}
	};

	/* other js function */
	/* ... */

	/* Initialize */
	(function Annie_Init() {
		Annie_Preloader();
		Annie_Nav();
		//Annie_Random();
		Annie_ToTop();
		//Annie_Comment();
	})();
});

//无限加载主页文章
jQuery(document).ready(function($) {
	var PageMotto = $('.motto').outerHeight();
	if( PageMotto > 120 ){
		//$('.page-name').hide();
		$('.page-name-other').hide();
	}
	
	
	if($('#pagination a').length == 0) {
		$('#pagination').hide();
	};
	if($('.commentnavi a').length == 0) {
		$('.commentnavi').hide();
	}; //若不存在链接则隐藏
	//点击下一页的链接(即那个a标签)   
	$('#pagination a,.commentnavi a').click(function() {
		$this = $(this);
		$this.addClass('loading').text("正在加载..."); //给a标签加载一个loading的class属性，可以用来添加一些加载效果   
		var href = $this.attr("href"); //获取下一页的链接地址   
		if(href != undefined) { //如果地址存在   
			$.ajax({ //发起ajax请求   
				url: href, //请求的地址就是下一页的链接   
				type: "get", //请求类型是get     
				error: function(request) {
					//如果发生错误怎么处理   
				},
				success: function(data) { //请求成功   
					$this.removeClass('loading').text("加载更多"); //移除loading属性   
					var $res = $(data).find("#post-list,.depth-1"); //从数据中挑出文章数据，请根据实际情况更改   
					$('#archive,.commentlist').append($res.fadeIn(500) ); //将数据加载加进posts-loop的标签中。 
					
					var newhref = $(data).find("#pagination a,.commentnavi a").attr("href"); //找出新的下一页链接   
					if(newhref != undefined) {
						$("#pagination a,.commentnavi a").attr("href", newhref);
					} else {
						$("#pagination,.commentnavi").remove(); //如果没有下一页了，隐藏   
					}
				}
			});
		}
		return false;
	});
});



//ajax查询相应标签or分类的文章
jQuery(document).ready(function($) {
	if($('.tags a').length == 0) {
		$('.tags').hide();
	};

	//点击下一页的链接(即那个a标签)   
	$('.tags a, .category a').click(function() {
		
		$this = $("#Tags-Categories-Preview");
		$this.addClass('#Tags-Categories-Preview').text(" "); //给a标签加载一个loading的class属性，可以用来添加一些加载效果   
		
		$this = $(this);
		var href = $this.attr("href"); //获取下一页的链接地址
		if(href != undefined) { //如果地址存在   
			$.ajax({ //发起ajax请求   
				url: href, //请求的地址就是下一页的链接   
				type: "get", //请求类型是get     
				error: function(request) {
					//如果发生错误怎么处理   
				},
				success: function(data) { //请求成功   
					//$this.removeClass('#tags-preview').text("加载更多"); //移除loading属性   
					var $res = $(data).find(".archive"); //从数据中挑出文章数据，请根据实际情况更改   
					$('#Tags-Categories-Preview').append($res.delay(5000).fadeIn('slow')); //将数据加载加进posts-loop的标签中。 
				}
			});
		}
		return false;
	});
});