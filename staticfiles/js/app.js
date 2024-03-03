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


    let editpkg = document.getElementsByClassName('editpkg')
    let pkg_id = document.getElementsByClassName('pkg_id')
    let modal_id = document.getElementsByClassName('pkg_modal_id')
    let pkgmodal = document.getElementsByClassName('pkgmodal')
    let cmd = document.getElementsByClassName('cmd')
    
    for (let om = 0; om < editpkg.length; om++) {
        editpkg[om].addEventListener('click', function(e) {
            e.stopImmediatePropagation()
            if (pkg_id[om].value == modal_id[om].value) {
                $(pkgmodal[om]).css({ display: 'block' })

                console.log(pkg_id[om].value)
                console.log(modal_id[om].value)
            }
        })
    }

    for (let c = 0; c < cmd.length; c++) {
        cmd[c].addEventListener('click', function() {
            $(pkgmodal[c]).css({ display: 'none' })
        })
        
    }

    $(document).on('submit', '#editPackageForm', function(e){
        e.preventDefault()
        var pkg_id1 = $(this).closest('.editPackageForm').find('.pkg_id').val()
        var pkg_title = $(this).closest('.editPackageForm').find('#pkg_title_edit').val()
        var daily_profit = $(this).closest('.editPackageForm').find('#pkg_profit_edit').val()
        var no_of_days = $(this).closest('.editPackageForm').find('#pkg_days_edit').val()
        var pur_bonus = $(this).closest('.editPackageForm').find('#pkg_bonus_edit').val()
        var min = $(this).closest('.editPackageForm').find('#pkg_min_edit').val()
        var max = $(this).closest('.editPackageForm').find('#pkg_max_edit').val()
        var amount = $(this).closest('.editPackageForm').find('#pkg_amount_edit').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let pkg_id = Number(pkg_id1)

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


    let selplan = document.getElementsByClassName('selectPlan')
    let sp_id = document.getElementsByClassName('selPlan_id')
    let spm_id = document.getElementsByClassName('selPlan_modal_id')
    let spm = document.getElementsByClassName('selPlanModal')
    let cspmd = document.getElementsByClassName('cspmd')
    let amount1 = document.getElementsByClassName('planAmount')
    let a3 = document.getElementsByClassName('a3')
    let amounterr = document.getElementsByClassName('amounterr')

    for (let sp = 0; sp < selplan.length; sp++) {
        selplan[sp].addEventListener('click', function() {
            if(amount1[sp].value < 100) {
                $(amount1[sp]).css('border','1.5px solid red')
                amounterr[sp].innerHTML = 'Invalid amount...' 
            } else{
                if (sp_id[sp].value == spm_id[sp].value) {
                    $(spm[sp]).css({ display: 'block' })
                    a3[sp].innerHTML = amount1[sp].value           
                } else{
                    $(spm[0]).css({ display: 'none' })
                }
                $(amount1[sp]).css('border','1px solid grey')
                amounterr[sp].innerHTML = ''
            }
        })
    }


    for (let c = 0; c < cspmd.length; c++) {
        cspmd[c].addEventListener('click', function() {
            $(spm[c]).css({ display: 'none' })
        })
    }


    $('.copiedInfo').css({ display: 'none' })
    $('.iHavePaid').css({ display: 'none' })
    var input
    $('.copyAddr').click(function() {
        var gw_pay_addr = $(this).closest('.copyAddrList').find('.toCopy').val()
        var gw_addr_copied = $(this).closest('.copyAddrList').find('.copiedInfo')
        input = document.createElement("textarea");
        input.value = gw_pay_addr

        input.setSelectionRange(0, 99999);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(input.value);
            $(gw_addr_copied).css({ display: 'block' })
          } else {
            document.body.appendChild(input)
            input.select();
            document.execCommand('copy')
            document.body.removeChild(input)
            $(gw_addr_copied).css({ display: 'block' })
          }

          $('.iHavePaid').css({ display: 'block' })
          $('.iPaid').css({ display: 'none' })
    }) 

    
    $(document).on('submit', '#transactionForm', function(e){
        e.preventDefault()
        var trans_plan = $(this).closest('.transactionForm').find('.trans_plan').text()
        var trans_profit = $(this).closest('.transactionForm').find('.trans_profit').text()
        var trans_days = $(this).closest('.transactionForm').find('.trans_days').text()
        var trans_bonus = $(this).closest('.transactionForm').find('.trans_bonus').text()
        var trans_amount = $(this).closest('.transactionForm').find('.trans_amount').text()
        var trans_paym = $(this).closest('.transactionForm').find('.trans_paym').text()
        var trans_paya = $(this).closest('.transactionForm').find('.trans_paya').text()
        var trans_paid = input.value
        var token = $('input[name=csrfmiddlewaretoken]').val()


        $.ajax({
            method: 'POST',
            url: '/invest/transaction/',
            data: {'trans_plan':trans_plan, trans_paid, 
                    'trans_profit':trans_profit, 'trans_days':trans_days,
                    'trans_bonus':trans_bonus, 'trans_amount':trans_amount, 
                    'trans_paym':trans_paym, 'trans_paya':trans_paya,
                    csrfmiddlewaretoken: token
            },
            success: function(response) {
                alertify.message(response.status)
                // $('#myModal2').css({ display: 'none' })
                location.href = "/account/dashboard/transactions"
            }
        })

    })


    $('.deltrans').click(function(e){
        e.preventDefault()      
        var trans_id1 = $(this).closest('.transactionList').find('.trans_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let trans_id = Number(trans_id1)

        console.log(trans_id)

        $.ajax({
            method: 'POST',
            url: '/account/delete-trans/',
            data: {'trans_id':trans_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })


    $('.confirmtrans').click(function(e){
        e.preventDefault()      
        var trans_id1 = $(this).closest('.transactionList').find('.trans_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let trans_id = Number(trans_id1)

        $.ajax({
            method: 'POST',
            url: '/account/confirm-trans/',
            data: {'trans_id':trans_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.delui').click(function(e){
        e.preventDefault()      
        var ui_id1 = $(this).closest('.uiList').find('.ui_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let ui_id = Number(ui_id1)

        $.ajax({
            method: 'POST',
            url: '/account/delete-ui/',
            data: {'ui_id':ui_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.activateui').click(function(e){
        e.preventDefault()      
        var ui_id1 = $(this).closest('.uiList').find('.ui_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let ui_id = Number(ui_id1)

        $.ajax({
            method: 'POST',
            url: '/account/activate-ui/',
            data: {'ui_id':ui_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.deactivateui').click(function(e){
        e.preventDefault()      
        var ui_id1 = $(this).closest('.uiList').find('.ui_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let ui_id = Number(ui_id1)

        $.ajax({
            method: 'POST',
            url: '/account/deactivate-ui/',
            data: {'ui_id':ui_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })

    $('.delwitdrw').click(function(e){
        e.preventDefault()      
        var wd_id1 = $(this).closest('.witdrawalsList').find('.wd_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()
        let wd_id = Number(wd_id1)

        console.log('hello')

        $.ajax({
            method: 'POST',
            url: '/account/delete-withdrawals/',
            data: {'wd_id':wd_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload()
            }
        })
    })


    // let totalBal = $('#totalBal').text()
    // let bplan = document.getElementById('bPlan').value
    // let sPlan = document.getElementById('sPlan').value
    // let pPlan = document.getElementById('pPlan').value
    // let uPlan = document.getElementById('uPlan').value

    // console.log(totalBal)
    // console.log(bplan)
    // console.log(pPlan)
    // console.log(uPlan)




    
    
    









    let ifm = $('.ifm')
    let wf = $('.withdrawFrom')
    $('#wft').click(function() {
        wf[0].innerHTML = "Withdraw from TOTAL"
        if($('#totalBal').text() < 500){
            $(ifm[0]).css({ display: 'block' })
            $(ifm[0]).fadeOut(20000)
        } else {
            $('#myModal1').css({ display: 'block' })
            document.getElementById('wfpt').value = ''
            $(ifm[0]).css({ display: 'none' })
        }
    })

    $('#wfp').click(function() {
        wf[0].innerHTML = "Withdraw from PROFIT"
        if($('#profitBal').text() < 500){
            $(ifm[1]).css({ display: 'block' })
            $(ifm[1]).fadeOut(20000)
        } else {
            $('#myModal1').css({ display: 'block' })
            document.getElementById('wfpt').value = 'PROFIT'
            $(ifm[1]).css({ display: 'none' })
        }
    })

    let minAmnt = $('.minAmnt')
    minAmnt[0].innerHTML = ''
    let totalBal1 = $('#totalBal').text()
    let profitBal1 = $('#profitBal').text()
    let profitBal2 = profitBal1.toString();
    let profitBal3 = profitBal2.slice(0, -3);
    let profitBal4 = parseInt(profitBal3);

    $('#wamnt').on('input', function(){
        let totalBal = parseFloat(totalBal1.replace(/,/g, ''));

        if($('#wamnt').val() < 500) {
            minAmnt[0].innerHTML = 'min=500,   max=500,000'
            $('.cfmw').css({ display: 'none' })
            return false
        } else if($('#wamnt').val() > totalBal){
            minAmnt[0].innerHTML = 'Insufficient funds'
            $('.cfmw').css({ display: 'none' })
        } else {
            minAmnt[0].innerHTML = ''
            $('.cfmw').css({ display: 'block' })
        }

        let wfpt = document.getElementById('wfpt').value
        if(wfpt == 'PROFIT') {
            if($('#wamnt').val() > profitBal4){
                minAmnt[0].innerHTML = 'Insufficient funds'
                $('.cfmw').css({ display: 'none' })
            } else {
                minAmnt[0].innerHTML = ''
                $('.cfmw').css({ display: 'block' })
            }
        }
    })

    $("input:radio").change(function () {
        if ($('#bw').is(":checked")) {
            document.getElementsByClassName('chkme')[0].innerHTML = 'Bank name'
            document.getElementsByClassName('chkme')[1].innerHTML = 'Account number'
        } else {
            document.getElementsByClassName('chkme')[0].innerHTML = 'Wallet'
            document.getElementsByClassName('chkme')[1].innerHTML = 'Address/Username'

        }
    });

    










































 
    
    $('#closeModal').click(function() {
        $('#myModal2').css({ display: 'none' })
        $('#myModal4').css({ display: 'none' })
        $('#myModal5').css({ display: 'none' })
        $('#myModal1').css({ display: 'none' })
    })



    $(document).on('click', function(e) {
        if (e.target.id === 'myModal2') {
            $('#myModal2').css({ display: 'none' })
        }

        if (e.target.id === 'myModal4') {
            $('#myModal4').css({ display: 'none' })
        }

        if (e.target.id === 'myModal1') {
            $('#myModal1').css({ display: 'none' })
        }

        // for (let p = 0; p < pkgmodal.length; p++) {
        //     if (pkgmodal[p].style.display == 'block') {
        //         $(pkgmodal[p]).css({ display: 'none' })
        //     }
        // }
        
    })


})(jQuery);