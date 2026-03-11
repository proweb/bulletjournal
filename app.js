const days = Array.from(document.querySelectorAll(".day"));
const notes = Array.from(document.querySelectorAll("textarea"));

document.addEventListener("keydown", (event) => {
  if (event.metaKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
  }
});

function highlightCurrentDay() {
  if (document.visibilityState !== "visible") {
    return;
  }

  const today = new Date();

  days.forEach((day, index) => {
    unhighlightDay(day);

    if (index === today.getDay() - 1) {
      const dateString = `${today.getDate()}.${today.getMonth() + 1}.`;
      highlightDay(day, dateString);
    }
  });
}

function highlightDay(day, dateString) {
  day.setAttribute("aria-current", "date");

  const date = document.createElement("span");
  date.textContent = dateString;

  const note = day.querySelector("textarea");
  const heading = day.querySelector(".heading");

  note.setAttribute("autofocus", "true");
  note.focus();
  heading.append(date);
}

function unhighlightDay(day) {
  day.removeAttribute("aria-current");

  const note = day.querySelector("textarea");
  const existingDate = day.querySelector(".heading > span");

  note.removeAttribute("autofocus");

  if (existingDate !== null) {
    existingDate.remove();
  }
}

highlightCurrentDay();
document.addEventListener("visibilitychange", highlightCurrentDay);

notes.forEach((note) => {
  const { id } = note;

  note.value = localStorage.getItem(id) ?? "";

  note.addEventListener("input", () => {
    localStorage.setItem(id, note.value);
  });
});
