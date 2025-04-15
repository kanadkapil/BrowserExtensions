document.getElementById('capture').addEventListener('click', function () {
    document.getElementById('status').textContent = 'Select an area to capture...';

    // Get the user's mouse movements to draw the crop area
    let startX, startY, endX, endY;

    const cropArea = document.createElement('div');
    cropArea.style.position = 'absolute';
    cropArea.style.border = '2px dashed #00f';
    cropArea.style.zIndex = 9999;
    document.body.appendChild(cropArea);

    document.body.style.cursor = 'crosshair';

    // Mouse Down
    document.body.onmousedown = function (e) {
        startX = e.pageX;
        startY = e.pageY;

        cropArea.style.left = `${startX}px`;
        cropArea.style.top = `${startY}px`;
        cropArea.style.width = '0px';
        cropArea.style.height = '0px';

        document.body.onmousemove = function (e) {
            endX = e.pageX;
            endY = e.pageY;

            cropArea.style.width = `${Math.abs(endX - startX)}px`;
            cropArea.style.height = `${Math.abs(endY - startY)}px`;
            cropArea.style.left = `${Math.min(startX, endX)}px`;
            cropArea.style.top = `${Math.min(startY, endY)}px`;
        };

        document.body.onmouseup = function () {
            // Capture the selected area using html2canvas
            html2canvas(document.body, {
                x: Math.min(startX, endX),
                y: Math.min(startY, endY),
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY)
            }).then(function (canvas) {
                // Convert the canvas to image
                const img = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = img;
                link.download = 'screenshot.png';
                link.click();

                document.body.style.cursor = 'default';
                cropArea.remove(); // Remove the cropping area after capture
                document.body.onmousemove = null;
                document.body.onmouseup = null;
            });
        };
    };
});
