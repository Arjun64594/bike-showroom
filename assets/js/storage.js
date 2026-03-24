// LocalStorage helpers for ARJUN BIKE WORLD

const ABW_STORAGE_KEYS = {
  enquiries: "abw_enquiries",
  testRides: "abw_test_rides",
  newsletter: "abw_newsletter",
  reviews: "abw_reviews",
  adminSession: "abw_admin_session"
};

function abwReadArray(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function abwWriteArray(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors for demo
  }
}

function abwAppendToArray(key, item) {
  const arr = abwReadArray(key);
  arr.push(item);
  abwWriteArray(key, arr);
  return arr;
}

function abwSaveAdminSession(session) {
  try {
    window.localStorage.setItem(ABW_STORAGE_KEYS.adminSession, JSON.stringify(session));
  } catch {
    //
  }
}

function abwGetAdminSession() {
  try {
    const raw = window.localStorage.getItem(ABW_STORAGE_KEYS.adminSession);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function abwClearAdminSession() {
  try {
    window.localStorage.removeItem(ABW_STORAGE_KEYS.adminSession);
  } catch {
    //
  }
}

window.ABW_STORAGE_KEYS = ABW_STORAGE_KEYS;
window.abwReadArray = abwReadArray;
window.abwWriteArray = abwWriteArray;
window.abwAppendToArray = abwAppendToArray;
window.abwSaveAdminSession = abwSaveAdminSession;
window.abwGetAdminSession = abwGetAdminSession;
window.abwClearAdminSession = abwClearAdminSession;

