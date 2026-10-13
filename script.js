// Профессиональный трекинг крутилок (Knobs) по круговому движению мыши
document.querySelectorAll(".knob-element").forEach((knob) => {
  let isDragging = false;

  // Начальные углы (в градусах). Железные ручки крутятся от -140 до 140 градусов.
  let minAngle = -140;
  let maxAngle = 140;
  let currentAngle = 0;

  knob.addEventListener("mousedown", (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Находим геометрический центр текущей крутилки на экране
    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Считаем угол между центром крутилки и курсором мыши
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Переводим радианы в градусы и смещаем ось, чтобы 0 был строго вверху
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    // Корректируем разворот, чтобы значения плавно переходили границы
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;

    // Задаем жесткий упор (ограничитель), как у аналогового микшера
    if (angle >= minAngle && angle <= maxAngle) {
      currentAngle = angle;
      knob.style.transform = `rotate(${currentAngle}deg)`;

      // Сюда в будущем мы мгновенно привяжем силу звуковых эффектов Tone.js
      const knobId = knob.dataset.id;
      const normalizedValue = (currentAngle - minAngle) / (maxAngle - minAngle); // Значение от 0 до 1
      console.log(`Крутилка ${knobId} изменена: ${normalizedValue.toFixed(2)}`);
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });
});
