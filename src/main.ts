import { DateTime } from "luxon";
import { Modal } from "bootstrap";

const FORMAT = "dd.LL.y HH:mm:ss";

const clockEl = document.getElementById("clock") as HTMLHeadingElement;
const showTimeBtnEl = document.getElementById("showTimeBtn") as HTMLButtonElement;
const timeModalEl = document.getElementById("timeModal") as HTMLElement;

const timeModal = new Modal(timeModalEl);

let intervalId: number | null = null;

function tick() {
  const now = DateTime.now();
  clockEl.textContent = now.toFormat(FORMAT);
}

// Показать модальное окно при клике на кнопку
showTimeBtnEl.addEventListener("click", () => {
  tick(); // Показать время сразу
  timeModal.show();
  
  // Запустить обновление каждую секунду
  if (intervalId === null) {
    intervalId = window.setInterval(tick, 1000);
  }
});

// Остановить обновление при закрытии модального окна
timeModalEl.addEventListener("hidden.bs.modal", () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
});