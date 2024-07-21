'use strict';
// reading file form computer
const codeInputUpload = document.querySelector('.code__input-upload');
const codeInputCopies = document.querySelector('.code__input-copies');
// const codeInputAdd = document.querySelector('.code__input-add');
const codeTextareaAdd = document.querySelector('.code__textarea-add');
const codePreviewBox = document.querySelector('.code__preview');
const downloadCodeBtn = document.querySelector('.code__download-btn');

codeInputUpload.addEventListener('change', function (e) {
  const uploadedCode = e.target.files[0];
  const copies = codeInputCopies.value;
  // const codeToAdd = codeInputAdd.value;

  const textArea = codeTextareaAdd.value;
  console.log(textArea);

  // const codeToAddStr = codeToAdd
  //   .split('/')
  //   .map(str => str + '\n')
  //   .join('');

  const fileReader = new FileReader();
  fileReader.readAsText(uploadedCode);

  fileReader.onload = function () {
    let multyCode = '';

    for (let i = 0; i < copies; i++) {
      multyCode += fileReader.result + '\n' + textArea;
    }

    codePreviewBox.classList.add('code__preview--active');
    downloadCodeBtn.classList.add('code__download-btn--active');

    codePreviewBox.textContent = multyCode;
  };
});

downloadCodeBtn.addEventListener('click', function () {
  const data = codePreviewBox.textContent;

  const file = new Blob([data], {
    type: 'text/plain',
  });

  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(file));
  link.setAttribute('download', 'print-file.gcode');
  link.click();
});

// N777 G01 X1.222 Y0.444 F100./N888 G02 X2.333 Y1.555 F100. G09
