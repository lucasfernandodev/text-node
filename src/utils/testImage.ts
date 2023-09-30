interface IResponse {
  valid: boolean,
  error: {
    message: string
  } | undefined
}

export function testImage(url: string, timeoutT: number): Promise<IResponse> {
  return new Promise(function (resolve, reject) {
      const timeout = timeoutT || 5000;
      let timer: ReturnType<typeof setTimeout> | undefined = undefined
      const img = new Image();

      img.onerror = img.onabort = function () {
          clearTimeout(timer);
          reject({
            valid: false,
            error: {
              message: 'Unable to load image'
            }
          });
      };
      img.onload = function () {
          clearTimeout(timer);
          resolve({
            valid: true,
            error: undefined
          });
      };
      timer = setTimeout(function () {
          // reset .src to invalid URL so it stops previous
          // loading, but doesn't trigger new load
          img.src = "//!!!!/test.jpg";
          reject({
            valid: false,
            error: 'Unable to load the image within the set time'
          });
      }, timeout);
      img.src = url;
  });
}