jQuery(document).ready(function(){
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

	var moreT = 60;
    var moreTopNum = [];
    $("#body-inner").find('h2').each(function() {
      moreTopNum.push($(this).offset().top - moreT);
    });
    console.log(moreTopNum);
    if (moreTopNum.length === 0) {
	    $("#body-inner").find('h3').each(function() {
	      moreTopNum.push($(this).offset().top - moreT);
	    });
	        // console.log(moreTopNum);
    };



    //滚动条滚动触发函数
    tabs(0);//初始化第一个active
    $(document).scroll(function() {
      var docTop = $(document).scrollTop();
      for (var i = 0; i < moreTopNum.length; i++) {
        if (docTop > moreTopNum[i]) {
          tabs(i);
        };
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
		      		    // console.log(thisindex);

	    });
	});
	// 左侧导航添加checked
	$(function(){
	    var current = location.pathname;
	    if (current === '/') {die();}
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