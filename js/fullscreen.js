jQuery(document).ready(function(){

// Fade
    jQuery(".thumbs img").fadeTo("slow", 0.3); // This sets the opacity of the thumbs to fade down to 60% when the page loads
    jQuery(".thumbs img").hover(function(){
        jQuery(this).fadeTo("slow", 1.0); // This sets 100% on hover
    },function(){
        jQuery(this).fadeTo("slow", 0.3); // This should set the opacity back to 30% on mouseout
    });

// Slide
    jQuery('.go-right').click(function() {
	    jQuery(".thumbs").stop().animate({left:'-'+(parseFloat(jQuery(".thumbs").width())-parseFloat(jQuery(window).width()))+'px'},{queue:false,duration:300});
	    jQuery(this).fadeTo('slow', 0.20);
	    jQuery('.go-left').show();
	    jQuery('img.go-left').fadeTo('slow', 1.0);
	    return false;
    });
    jQuery('.go-left').click(function() {
	    jQuery(".thumbs").stop().animate({left:'0'},{queue:false,duration:300});
	    jQuery(this).fadeTo('slow', 0.20);
	    jQuery('.go-right').show();
	    jQuery('img.go-right').fadeTo('slow', 1.0);
	    return false;
    });

// Scroll
    jQuery('.home-thumbs').mousedown(function (event) {
        jQuery(this)
            .data('down', true)
            .data('x', event.clientX)
            .data('scrollLeft', this.scrollLeft);
            
        return false;
    }).mouseup(function (event) {
        jQuery(this).data('down', false);
    }).mousemove(function (event) {
        if (jQuery(this).data('down') == true) {
            this.scrollLeft = jQuery(this).data('scrollLeft') + jQuery(this).data('x') - event.clientX;
        }
    }).mousewheel(function (event, delta) {
        this.scrollLeft -= (delta * 30);
    }).css({
        'overflow' : 'hidden',
        'cursor' : '-moz-grab'
    });
});

jQuery(window).mouseout(function (event) {
    if (jQuery('.home-thumbs').data('down')) {
        try {
            if (event.originalTarget.nodeName == 'BODY' || event.originalTarget.nodeName == 'HTML') {
                jQuery('.home-thumbs').data('down', false);
            }                
        } catch (e) {}
    }
});