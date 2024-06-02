function setupGyroscope() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', handleMotionEvent);
        } else {
          document.getElementById('gyroData').innerText = 'Permission to access gyroscope was denied.';
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non-iOS 13+ devices.
    window.addEventListener('devicemotion', handleMotionEvent);
  }
}

function handleMotionEvent(event) {
  const x = event.rotationRate.alpha;
  const y = event.rotationRate.beta;
  const z = event.rotationRate.gamma;

  document.getElementById('gyroData').innerText = `X: ${x}, Y: ${y}, Z: ${z}`;
}

document.getElementById('gyroData').innerText = 'Tap here to enable gyroscope data.';
document.getElementById('gyroData').addEventListener('click', setupGyroscope);
