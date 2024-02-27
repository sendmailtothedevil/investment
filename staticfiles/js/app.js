(function($) {
    "use strict"

    $(document).on('submit', '#registerForm', function(e){
        e.preventDefault()
        var full_name = $('input[name=full_name]').val()
        var email = $('input[name=email]').val()
        var password = $('input[name=password]').val()
        var password2 = $('input[name=password2]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if(password2 != password) {
            $('.pass').css({ border: '1px, solid, red',})
            document.getElementById('passerr2').innerHTML = 'Password do not match'
            return false
        } else {
            document.getElementById('passerr2').innerHTML = ''
        }

        console.log(full_name)
        console.log(email)
        console.log(password)
        console.log(password2)
        console.log(token)

        $.ajax({
            method: 'POST',
            url: '/account/register/',
            data: {
                'full_name':full_name, 'email':email,
                'password':password, csrfmiddlewaretoken: token
            },
            success: function(response) {
                console.log(response.status)
                if (response.status == 'Email already exist, try another...') {
                    $('.reloademail').load(location.href + " .reloademail")
                    document.getElementById('emerr').innerHTML = 'Email already exist, try another...'
                } else {
                    $('#signUpForm').load(location.href + " #signUpForm")
                    $('#myModal').css({ display: 'block' })
                    $('#reg_email').append(response.data);
                }
            }
        })
    })



    $(document).on('submit', '#loginForm', function(e){
        e.preventDefault()
        var email = $('input[name=log_email]').val()
        var password = $('input[name=log_password]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        $.ajax({
            method: 'POST',
            url: '/account/login/',
            data: {
                    'email':email, 'password':password,
                    csrfmiddlewaretoken: token
            },
            success: function(response) {
                if (response.status == 'No account found...REGISTER') {
                    $('.emailreload').load(location.href + " .emailreload")
                    document.getElementById('emerr2').innerHTML = 'No account found...REGISTER'
                    document.getElementById('passerr').innerHTML = ''
                } else if (response.status == 'Incorrect password') {
                    alertify.message('An error occurred. Please make sure you have verified your email...')
                    $('.passwordreload').load(location.href + " .passwordreload")
                    document.getElementById('emerr2').innerHTML = ''
                    document.getElementById('passerr').innerHTML = 'Incorrect password OR unverified email'
                } else {
                    location.href = "/"
                }
            }
        })
    })













































































    var openM = document.getElementsByClassName('openM')
    var SHOW = document.getElementsByClassName('SHOW')

    openM[0].addEventListener('click', function() {
        SHOW[0].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()

        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[0]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[1].addEventListener('click', function() {
        SHOW[1].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[1]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[2].addEventListener('click', function() {
        SHOW[2].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[2]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[3].addEventListener('click', function() {
        SHOW[3].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[3]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[4].addEventListener('click', function() {
        SHOW[4].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[4]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[5].addEventListener('click', function() {
        SHOW[5].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[5]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[6].addEventListener('click', function() {
        SHOW[6].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[6]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[7].addEventListener('click', function() {
        SHOW[7].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[7]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[8].addEventListener('click', function() {
        SHOW[0].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()

        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[0]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[9].addEventListener('click', function() {
        SHOW[1].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[1]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[10].addEventListener('click', function() {
        SHOW[2].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[2]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[11].addEventListener('click', function() {
        SHOW[3].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[3]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[12].addEventListener('click', function() {
        SHOW[4].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[4]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[13].addEventListener('click', function() {
        SHOW[5].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[5]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[14].addEventListener('click', function() {
        SHOW[6].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[6]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

    openM[15].addEventListener('click', function() {
        SHOW[7].style.display = 'block';
        $('.mobileSide').hide("slide", { direction: "left" }, 500);
        $('.oms').show()
        $('.cms').hide()
        for (let sw = 0; sw < SHOW.length; sw++) {
            if (SHOW[sw] != SHOW[7]) {
                SHOW[sw].style.display = 'none';
            }
        }
    })

})(jQuery);