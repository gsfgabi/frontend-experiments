const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  downloadBtn = document.getElementById("download-btn");

let preValue;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Gerando código QR...";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
  qrImg.src = qrCodeUrl;

  qrImg.addEventListener("load", () => {
    qrImg.style.display = "block";  
    wrapper.classList.add("active");
    generateBtn.innerText = "Gerar QR Code";
    downloadBtn.style.display = "block";
    downloadBtn.href = qrCodeUrl;
    downloadBtn.download = "QRCode.png";
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    qrImg.style.display = "none";  
    downloadBtn.style.display = "none";
  }
});
