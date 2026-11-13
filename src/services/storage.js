// storage.js
// Small helper around AsyncStorage so every screen saves and loads data the same way.
// AsyncStorage only stores strings, so we convert objects with JSON.stringify / JSON.parse.
import AsyncStorage from '@react-native-async-storage/async-storage';

// All keys in one place so we never mistype them
export const KEYS = {
  USERS: 'glowup_users',
  SESSION: 'glowup_session',
  FAVOURITES: 'glowup_favourites',
  SKIN_TYPE: 'glowup_skin_type',
  PRODUCTS: 'glowup_products',
  NOTIFICATIONS: 'glowup_notifications',
};

// Save any value (object, array, string) under a key
export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('saveData error:', error);
  }
}

// Load a value. Returns fallback if nothing was saved yet.
export async function loadData(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.log('loadData error:', error);
    return fallback;
  }
}

// Remove one key (used for logout)
export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('removeData error:', error);
  }
}
