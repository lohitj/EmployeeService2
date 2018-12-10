/// <reference path="jquery-1.10.2.min.js" />
function getAccessToken() {
    if (location.hash) {
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                isUserRegistered(accessToken);
            }
        }
    }
}
function isUserRegistered(accessToken) {
    alert(accessToken);
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        header: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer '+accessToken
        },
        success: function (response) {
            if (response.HasRegistered) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('Username', response.Email);
                window.location.href = 'Data.html';
            }
            else {
                signupExternalUser(accessToken);
            }
        }
    });
}
function signupExternalUser(accessToken) {
    $.ajax({
        url: '/api/Account/RegisteredExternal',
        method: 'POST',
        header: {
            'content-type': 'application/JSON',
            'Authorization' : 'Bearer' + accessToken
        },
        success: function () {
            window.location.href = '/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A62676%2FLogin.html&state=7mL3MYbx4nrziYXognUtQOFH-J89-8mAmjAxKj0zQi01'
        }
    });
}