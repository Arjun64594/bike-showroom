// Simple form validators shared across pages

function isNonEmpty(value) {
  return value != null && String(value).trim().length > 0;
}

function isValidEmail(value) {
  if (!isNonEmpty(value)) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
}

function isValidPhoneIN(value) {
  if (!isNonEmpty(value)) return false;
  const re = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  return re.test(String(value).trim());
}

function setFeedback(el, message, isError = true) {
  if (!el) return;
  el.textContent = message || "";
  el.classList.remove("form-error", "form-success");
  if (message) {
    el.classList.add(isError ? "form-error" : "form-success");
  }
}

window.ABW_VALIDATORS = {
  isNonEmpty,
  isValidEmail,
  isValidPhoneIN,
  setFeedback
};

