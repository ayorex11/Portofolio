$(document).ready(function(){
    // Show welcome modal on page load
    $('.welcome-modal').show();
    
    // Handle enter button click
    $('.enter-btn').click(function(){
        $('.welcome-modal').fadeOut();
    });
    
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: [ "Security Analyst", "Developer", "Cybersecurity Specialist"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: [ "Security Analyst", "Developer", "Cybersecurity Specialist"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Contact form submission
    $('#contact-form').submit(function(e){
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});