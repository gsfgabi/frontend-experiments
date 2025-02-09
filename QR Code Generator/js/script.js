const qrInput = document.getElementById("qr-input"),
  generateBtn = document.getElementById("generate-btn"),
  qrContainer = document.getElementById("qr-code"), // Div para exibir o QR Code
  downloadBtn = document.getElementById("download-btn"),
  qrUpload = document.getElementById("qr-upload"),
  uploadBtn = document.getElementById("upload-btn"),
  qrContentDiv = document.getElementById("qr-content");

let qrCodeInstance = null;

// Gerar QR Code
generateBtn.addEventListener("click", () => {
  const qrValue = qrInput.value.trim();
  if (!qrValue) {
    console.warn("Nenhum valor inserido para gerar o QR Code.");
    return;
  }

  console.log("Botão de gerar QR Code foi clicado.");
  console.log("Valor inserido no input:", qrValue);

  // Limpar QR Code anterior
  qrContainer.innerHTML = "";
  qrCodeInstance = new QRCode(qrContainer, {
    text: qrValue,
    width: 200,
    height: 200,
  });

  console.log("QR Code gerado com sucesso!");

  setTimeout(() => {
    const qrImage = qrContainer.querySelector("img");
    if (qrImage) {
      console.log("QR Code convertido para imagem:", qrImage.src);
      downloadBtn.href = qrImage.src;
      downloadBtn.download = "QRCode.png";
      downloadBtn.style.display = "block";
    } else {
      console.warn("Erro ao capturar a imagem do QR Code.");
    }
  }, 500);
});

uploadBtn.addEventListener("click", () => {
  qrContentDiv.style.display = "none";
  qrContentDiv.innerText = "";

  const file = qrUpload.files[0];
  if (!file) {
    console.warn("Nenhum arquivo selecionado.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      console.log("Imagem carregada para leitura do QR Code.");

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Imagem desenhada no canvas para extração do QR Code.");

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        console.log("QR Code detectado com sucesso:", code.data);
        qrContentDiv.innerText = `Conteúdo do QR Code: ${code.data}`;
        qrContentDiv.style.display = "block";
      } else {
        console.warn("Nenhum QR Code foi detectado na imagem.");
        qrContentDiv.innerText = "QR Code não pôde ser lido.";
        qrContentDiv.style.display = "block";
      }
    };

    img.onerror = function () {
      console.error("Erro ao carregar a imagem.");
    };
  };

  reader.onerror = function () {
    console.error("Erro ao ler o arquivo.");
  };

  reader.readAsDataURL(file);
});
