from .models import User
from django.contrib.auth.forms import PasswordChangeForm, UserChangeForm, PasswordResetForm, SetPasswordForm

class MyChangePasswordForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super(MyChangePasswordForm, self).__init__(*args, **kwargs)
        
        self.fields['old_password'].widget.attrs.update({
            'class':'asfi cse text_ccc bg-white py-4 fs-6 cpi pwd_inp pwd_inp1 usr_inp',
            'placeholder':'Enter your current password',
            'id':'oldPass'
        })
        self.fields['new_password1'].widget.attrs.update({
            'class':'asfi cse text_ccc bg-white py-4 fs-6 cpi pwd_inp pwd_inp1 usr_inp',
            'placeholder':'Use a strong password',
            'id':'newPass1'
        })
        self.fields['new_password2'].widget.attrs.update({
            'class':'asfi cse text_ccc bg-white py-4 fs-6 cpi pwd_inp pwd_inp2 usr_inp',
            'placeholder':'Confirm new password',
            'id':'newPass2'
        })


class PasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super(PasswordResetForm, self).__init__(*args, **kwargs)
        
        self.fields['email'].widget.attrs.update({
            'name':'email',
            'type':'email',
            'class':'asfi cse text_ccc bg-white py-4 fs-6 usr_inp user_log email_inp reset_pwd_email"',
            'placeholder':'Enter your email',
            'id':'reset_pwd_email'
        })


class SetPasswordForm(SetPasswordForm):
    class Meta:
        model = User()
        
    def __init__(self, *args, **kwargs):
        super(SetPasswordForm, self).__init__(*args, **kwargs)
        
        self.fields['new_password1'].widget.attrs.update({
            'class':'asfi cse text_ccc bg-white py-4 fs-6 cpi pwd_inp pwd_inp1 usr_inp',
            'placeholder':'Enter new password',
            'id':'rnewPass1'
        })
        self.fields['new_password2'].widget.attrs.update({
            'class':'asfi cse text_ccc bg-white py-4 fs-6 cpi pwd_inp pwd_inp2 usr_inp',
            'placeholder':'Confirm new password',
            'id':'rnewPass2'
        })
