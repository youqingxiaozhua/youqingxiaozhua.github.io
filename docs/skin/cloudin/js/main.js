jQuery(document).ready(function(){

	// 左侧导航添加checked
	$(function(){
	    var current = location.pathname;
	    if (current === '/docs/') {die();}
	    $('.animated li a').each(function(){
	        var $this = $(this);
	        if($this.attr('href').indexOf(current) !== -1){
	            $this.addClass('active');
	           	// console.log($this);
	            // $this.parentsUntil('#sidebar').prop("checked", true);
	            $this.parentsUntil('.animated').children("input[type='checkbox']").prop("checked", true);
	            // console.log($this.parentsUntil('.animated'));
	        }
	    });
	});
});

jQuery(window).load(function(){
// setTimeout(function(){
	//Index显示目录
    var title2 = document.getElementsByTagName("h2");
    if (title2.length == 0){
    	title2 = document.getElementsByTagName("h3");
    }
    if ((title2.length > 2) && ($(document).height() >= $(window).height()*1.8)) {
		$("#index").removeClass('index-out');
		$("#index").addClass('index-in');
		// $("#body").css("margin-right","180px");
		for (var i = 0;i < title2.length;i++){
	        title2.name = title2[i].innerHTML;
	        var indexlist = '<li class="indexlist"><a title="'+title2[i].innerHTML+'">'+title2[i].innerHTML+'</a></li>';
	    	$("#index").find('.table-of-contents').append(indexlist);
	    }
	}else{
		$("#body").css("margin-right","0px");
		// $("#index").removeClass('index-in');
		// $("#index").addClass('index-out');
	}


	var accordionsMenu = $('.cd-accordion-menu');

	if( accordionsMenu.length > 0 ) {
		
		accordionsMenu.each(function(){
			var accordion = $(this);
			//detect change in the input[type="checkbox"] value
			accordion.on('change', 'input[type="checkbox"]', function(){
				var checkbox = $(this);
				console.log(checkbox.prop('checked'));
				( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
			});
		});
	};

	// 为table添加class
	$("#body-inner").find('table').each(function() {
	      $(this).addClass('table table-hover');
    });


		var moreT = 80;
	    var moreTopNum = [];

	    $("#body-inner").find('h2').each(function() {
	      moreTopNum.push($(this).offset().top - moreT);
	    });
	    console.log(moreTopNum);
	    if (moreTopNum.length === 0) {
		    $("#body-inner").find('h3').each(function() {
		      moreTopNum.push($(this).offset().top - moreT);
		    });
		        console.log(moreTopNum);
	    };


    //滚动条滚动触发函数
    tabs(0);//初始化第一个为active
    $(document).scroll(function() {
      var docTop = $(document).scrollTop();
      for (var i = 0; i <= moreTopNum.length; i++) {
        if (docTop > moreTopNum[i]) {
	  	    if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
		        var lastindex = moreTopNum.length-1;
		        tabs(lastindex);
		        console.log(lastindex);
		    }else {
	          tabs(i);
	        };
        }
      };

    });

    //tabs锚点设置
    function tabs(index) {
      if (index || index === 0) {
        $('.table-of-contents').find('li').find('a').removeClass('active').end().eq(index).find('a').addClass('active');
      } else {
        $('.table-of-contents').find('li').find('a').removeClass('active').end();
      };
    };

    // 返回顶部+描点平滑滚动
    $(function() {
    	$('.back-to-top').click(function(){$("html,body").animate({scrollTop:0},500)});
	    function mores(index, obj) {
		      var scrolltop = moreTopNum[index];
		      $('html,body').animate({scrollTop: scrolltop +1 +'px'}, 300);
		      // $("html,body").animate({scrollTop:0},500);
	    }

	    function setTabs(index, obj) {
		      mores(index, obj);
	    };
	    $('.indexlist').click(function() {
		      var thisindex = $(this).index();
		      setTabs(thisindex, $(this));


	    });
	});
// },100);//load后延迟100ms
});
