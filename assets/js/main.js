function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function getUsers() {
  const localStorageUsers = localStorage.getItem('users')

  if (!localStorageUsers) {
    return []
  }

  if (localStorageUsers) {
    return JSON.parse(localStorageUsers)
  }
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

function resetForm() {
  $('#form-register')[0].reset()
}

$(function() {
  $('#button-register').click(function() {
    let formValid = true
    const users = getUsers()
    const formValues = {
      fullname: $('#fullname').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      rePassword: $('#re-password').val(),
    }

    if (!formValues.fullname) {
      formValid = false
      alert('Bạn chưa nhập họ tên!');
      return
    }

    if (!formValues.email || !validateEmail(formValues.email) || users.find(user => user.email === formValues.email)) {
      formValid = false
      alert('Email không hợp lệ!');
      return;
    }

    if (!formValues.password || formValues.password.length < 6) {
      formValid = false
      alert('Mật khẩu không hợp lệ!');
      return; 
    }

    if (!formValues.rePassword || formValues.rePassword !== formValues.password) {
      formValid = false
      alert('Lặp lại mật khẩu không hợp lệ!');
      return;       
    }

    if (formValid) {
      resetForm();
      alert('Register success')
      // Remove rePassword
      delete formValues.rePassword;
      // Add to users
      users.push(formValues)
      // Save to localStorage -> users
      setUsers(users)
    }
  })

  $('#button-reset').click(function() {
    resetForm();
  })

  $('#button-login').click(function() {
    const users = getUsers()
    const email = $('#email').val()
    const password = $('#password').val()

    if (email && password) {
      if (users.find(user => user.email === email && user.password === password)) {
        alert('Đăng nhập thành công!')
        window.location.href = 'https://vtiacademy.edu.vn'
      }
    } else {
      alert('Đăng nhập thất bại!')
    }
  })
})

