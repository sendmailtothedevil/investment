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


    $('#addPackage').click(function() {
        $('#myModal2').css({ display: 'block' })
        $('.addpkg').css({ display: 'block' })
        $('.editsec').css({ display: 'none' })
    })

    $('#closeModal').click(function() {
        $('#myModal2').css({ display: 'none' })
    })
    
    $(document).on('submit', '#addPackageForm', function(e){
        e.preventDefault()      
        var packages = $('#package').val()
        var daily_profit = $('#daily_profit').val()
        var no_of_days = $('#no_of_days').val()
        var pur_bonus = $('#pur_bonus').val()
        var min = $('#min').val()
        var max = $('#max').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        $.ajax({
            method: 'POST',
            url: '/invest/add-package/',
            data: {'packages':packages, 'daily_profit':daily_profit, 'no_of_days':no_of_days,
                    'pur_bonus':pur_bonus, 'min':min, 'max':max,  csrfmiddlewaretoken: token
            },
            success: function(response) {
                alertify.message(response.status)
                // $('#myModal2').css({ display: 'none' })
                window.location.reload()
            }
        })
    })

    $('.delpkg').click(function(e){
        e.preventDefault()      
        var package_id1 = $(this).closest('.packageList').find('.package_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let package_id = Number(package_id1)

        $.ajax({
            method: 'POST',
            url: '/invest/delete-package/',
            data: {'package_id':package_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.activate').click(function(e){
        e.preventDefault()      
        var package_id1 = $(this).closest('.packageList').find('.package_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let package_id = Number(package_id1)

        $.ajax({
            method: 'POST',
            url: '/invest/activate-package/',
            data: {'package_id':package_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.deactivate').click(function(e){
        e.preventDefault()      
        var package_id1 = $(this).closest('.packageList').find('.package_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let package_id = Number(package_id1)

        $.ajax({
            method: 'POST',
            url: '/invest/deactivate-package/',
            data: {'package_id':package_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })


    $('.editpkg').click(function() {
        $('#myModal2').css({ display: 'block' })
        $('.addpkg').css({ display: 'none' })
        $('.editsec').css({ display: 'block' })
        document.getElementById('addPackageForm').id = 'editPackageForm'

        var pkg_id = $(this).closest('.packageList').find('.package_id').val()
        var pkg_title = $(this).closest('.packageList').find('.pkg_title').prop("innerText")
        var pkg_profit = $(this).closest('.packageList').find('.pkg_profit').prop("innerText")
        var pkg_days = $(this).closest('.packageList').find('.pkg_days').prop("innerText")
        var pkg_bonus = $(this).closest('.packageList').find('.pkg_bonus').prop("innerText")
        var pkg_min = $(this).closest('.packageList').find('.pkg_min').prop("innerText")
        var pkg_max = $(this).closest('.packageList').find('.pkg_max').prop("innerText")
        var pkg_amount = $(this).closest('.packageList').find('.pkg_amount').prop("innerText")
        
        document.getElementById('pkg_id').value = pkg_id
        document.getElementById('pkginp').value = pkg_title
        document.getElementById('dpinp').value = pkg_profit
        document.getElementById('nodinp').value = pkg_days
        document.getElementById('pbinp').value = pkg_bonus
        document.getElementById('mininp').value = pkg_min
        document.getElementById('maxinp').value = pkg_max
        document.getElementById('numinp').value = pkg_amount


        $(document).on('submit', '#editPackageForm', function(e){
            e.preventDefault()      
            var pkg_id1 = $('#pkg_id').val()
            var pkg_title = $('#pkginp').val()
            var daily_profit = $('#dpinp').val()
            var no_of_days = $('#nodinp').val()
            var pur_bonus = $('#pbinp').val()
            var min = $('#mininp').val()
            var max = $('#maxinp').val()
            var amount = $('#numinp').val()
            let pkg_id = Number(pkg_id1)
            var token = $('input[name=csrfmiddlewaretoken]').val()
    
            $.ajax({
                method: 'POST',
                url: '/invest/edit-package/',
                data: {'pkg_id':pkg_id, 'pkg_title':pkg_title, 'daily_profit':daily_profit, 'no_of_days':no_of_days,
                        'amount':amount, 'pur_bonus':pur_bonus, 'min':min, 'max':max,  csrfmiddlewaretoken: token
                },
                success: function(response) {
                    alertify.message(response.status)
                    // $('#myModal2').css({ display: 'none' })
                    window.location.reload()
                }
            })
        })    
    })
    
    $('.deluser').click(function(e){
        e.preventDefault()      
        var user_id1 = $(this).closest('.userList').find('.user_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let user_id = Number(user_id1)

        $.ajax({
            method: 'POST',
            url: '/account/delete-user/',
            data: {'user_id':user_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })
    
    $('#addGateway').click(function() {
        $('#myModal4').css({ display: 'block' })
    })

    $('.delgw').click(function(e){
        e.preventDefault()      
        var gw_id1 = $(this).closest('.gatewayList').find('.gw_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let gw_id = Number(gw_id1)

        console.log(gw_id)

        $.ajax({
            method: 'POST',
            url: '/account/delete-gateway/',
            data: {'gw_id':gw_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.activategw').click(function(e){
        e.preventDefault()      
        var gw_id1 = $(this).closest('.gatewayList').find('.gw_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let gw_id = Number(gw_id1)

        $.ajax({
            method: 'POST',
            url: '/account/activate-gateway/',
            data: {'gw_id':gw_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.deactivategw').click(function(e){
        e.preventDefault()      
        var gw_id1 = $(this).closest('.gatewayList').find('.gw_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let gw_id = Number(gw_id1)

        $.ajax({
            method: 'POST',
            url: '/account/deactivate-gateway/',
            data: {'gw_id':gw_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })
    
    $('.delmsg').click(function(e){
        e.preventDefault()      
        var msg_id1 = $(this).closest('.messageList').find('.msg_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let msg_id = Number(msg_id1)

        console.log(msg_id)

        $.ajax({
            method: 'POST',
            url: '/account/delete-message/',
            data: {'msg_id':msg_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })




























































    $(document).on('click', function(e) {
        if (e.target.id === 'myModal2') {
            $('#myModal2').css({ display: 'none' })
        }

        if (e.target.id === 'myModal4') {
            $('#myModal4').css({ display: 'none' })
        }
        
    })


})(jQuery);