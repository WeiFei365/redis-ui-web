function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

export default function request(url, options) {
  return fetch(url, options).then((response) => {
    const err = checkStatus(response);
    if (err) {
      return { code: -1 };
    }
    return response.json().catch((err) => {
      return { code: -3 };
    });
  }, (err) => {
    return { code: -2 };
  }).then((data) => {
    // 1、前端错误处理
    if ([-1, -2, -3].indexOf(data.code) !== -1) {
      throw `fetching error ${data.code}`;
    }
    // 2、检查成功的标志
    if (data.code === 0) {
      return data.data;
    }
    // 3、检查用户登录状态
    if (data.code === 1009) {
      if (url.indexOf('/user/token') !== -1) {
        return data;
      }
      // document.location.reload();
      return {};
    }
    return data;
  });
}
